const Users = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const sendMail = require("./sendMail");
const {CLIENT_URL} = process.env

const userCtrl = {
    register : async (req, res) => {
        try {
            const { email, password } = req.body;

            if(!email || !password)
            { 
                return res.status(400).json({msg:"Please fill in all fields."})
            }
            
            const user = await Users.findOne({email});
            if(user){
                return res.status(400).json({msg:"This email already exists"})
            }
     
            const passwordHash = await bcrypt.hash(password,12);
            const newUser = {
                email, password: passwordHash
            }

            const activation_token = createActivationToken(newUser);

            const url = `${CLIENT_URL}/user/activate/${activation_token}`
            sendMail(email, url,"Verify your email address",1);
            // console.log(sendMail);
            res.json({msg:"Register Success! Please activate your email to start."});
        }catch(err){
            return res.status(500).json({msg: err.message});
        }
    },
    activateEmail: async (req, res) => {
        try {
            const {activation_token} = req.body
            const user = jwt.verify(activation_token, process.env.ACTIVATION_TOKEN_SECRET)
            
            console.log(user);
            const { email, password} = user

            const check = await Users.findOne({email})
            if(check) return res.status(400).json({msg:"This email already exists."})

            const newUser = new Users({
                 email, password
            })

            await newUser.save()

            res.json({msg: "Account has been activated!"})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    login: async (req, res) => {
        try {
            const {email, password} = req.body
            const user = await Users.findOne({email})
            if(!user) return res.status(400).json({msg: "This email does not exist."})

            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch) return res.status(400).json({msg: "Password is incorrect."})

            const refresh_token = createRefreshToken({id: user._id})
            res.cookie('refreshtoken', refresh_token, {
                httpOnly: true,
                path: '/user/refresh_token',
                maxAge: 7*24*60*60*1000 // 7 days
            })

            res.json({msg: "Login success!"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getAccessToken: (req, res) => {
        try {
            const rf_token = req.cookies.refreshtoken
            if(!rf_token) return res.status(400).json({msg: "Please login now!"})

            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                if(err) return res.status(400).json({msg: "Please login now!"})

                const access_token = createAccessToken({id: user.id})
                res.json({access_token})
            })
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    forgotPassword: async (req, res) => {
        try {
            const {email} = req.body
            const user = await Users.findOne({email})
            if(!user) return res.status(400).json({msg: "This email does not exist."})

            const access_token = createAccessToken({id: user._id})
            const url = `${CLIENT_URL}/user/reset/${access_token}`

            sendMail(email, url, "Reset your password",2)
            res.json({msg: "Re-send the password, please check your email."})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
}

const createActivationToken = (payload) => {
    return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET,{expiresIn : '5m'})
}

const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET,{expiresIn : '15m'})
}

const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET,{expiresIn : '7d'})
}


module.exports = userCtrl;