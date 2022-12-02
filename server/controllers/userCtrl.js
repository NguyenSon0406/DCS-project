const Users = require('../models/userModel')
const userInfo = require('../models/userInfoModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const sendMail = require("./sendMail");
const { CLIENT_URL } = process.env
const companyInfo = require('../models/companyModel')
const adminInfo = require('../models/adminModel');

const userCtrl = {
    register: async (req, res) => {
        try {
            const { email, password, role, firstName, lastName, phone_number, company_name } = req.body;

            if (!email || !password) {
                return res.status(400).json({ msg: "Please fill in all fields." })
            }

            const user = await Users.findOne({ email });
            if (user) {
                return res.status(400).json({ msg: "This email already exists" })
            }
            // if(!user){
            //     return res.status(400).json({msg:"Use your DTU email to register!"})
            // }
            const passwordHash = await bcrypt.hash(password, 12);
            let newUser = '';
            if (role === 0) {
                newUser = {
                    email, password: passwordHash, role
                }
            } else if (role === 1) {
                newUser = {
                    email, password: passwordHash, role, firstName, lastName, phone_number, company_name
                }
            }

            const activation_token = createActivationToken(newUser);

            const url = `${CLIENT_URL}/user/activate/${activation_token}`
            sendMail(email, url, "Verify your email address", 1);
            res.json({ msg: "Register Success! Please activate your email to start." });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    activateEmail: async (req, res) => {
        try {
            const { activation_token } = req.body;
            const user = jwt.verify(activation_token, process.env.ACTIVATION_TOKEN_SECRET);

            const { email, password, role, firstName, lastName, phone_number, company_name } = user;

            const check = await Users.findOne({ email });
            if (check) return res.status(400).json({ msg: "This account already activated!" });
            // await Users.updateOne({_id, isVerify:true});
            // if(check.isVerify) return res.status(400).json({msg:"This email already exists."})

            let newUser = "";
            if (role === 0) {
                newUser = new Users({
                    email, password, isVerify: "true"
                })
                await newUser.save();
            }
            else if (role === 1) {
                newUser = new Users({
                    email, password, role, isVerify: "true"
                })
                await newUser.save(function () {
                    const newInfo = new companyInfo({
                        user_id: newUser._id, email, firstName, lastName, contact: phone_number, companyName: company_name, address: ''
                    });
                    newInfo.save();
                })
            }
            res.json({ msg: "Account has been activated!" })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body
            const user = await Users.findOne({ email })
            if (!user) return res.status(400).json({ msg: "Incorrect email or password." })

            if (user.isVerify === false)
                return res.status(400).json({ msg: "This account hasn't been activated yet. If you are student, please use your DTU email to sign up." })
            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) return res.status(400).json({ msg: "Incorrect email or password." })

            const access_token = createAccessToken({ id: user._id })

            res.status(200).json({ msg: 'login success', access_token })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getAccessToken: (req, res) => {
        try {
            const rf_token = req.cookies.refreshtoken
            if (!rf_token) return res.status(400).json({ msg: "Please login now!" })

            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                if (err) return res.status(400).json({ msg: "Please login now!" })

                const access_token = createAccessToken({ id: user.id })
                res.json({ access_token })
            })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    forgotPassword: async (req, res) => {
        try {
            const { email } = req.body
            const user = await Users.findOne({ email })
            if (!user) return res.status(400).json({ msg: "This email does not exist." })

            const access_token = createAccessToken({ id: user._id })
            const url = `${CLIENT_URL}/user/reset/${access_token}`

            sendMail(email, url, "Reset your password", 2)
            res.json({ msg: "Re-send the password, please check your email." })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    resetPassword: async (req, res) => {
        try {
            const { password } = req.body
            const passwordHash = await bcrypt.hash(password, 12)

            await Users.findOneAndUpdate({ _id: req.user.id }, {
                password: passwordHash
            })

            res.json({ msg: "Password successfully changed!" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getUserInfor: async (req, res) => {
        const token = req.header('Authorization')
        if (!token)
            return res
                .status(401)
                .json({ success: false, message: 'Access token not found' })
        try {
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
            const id = decoded.id
            let info = '';
            const user = await Users.findById(id).select('-password')
            if (user.role === 0) {
                info = await userInfo.findOne({ user_id: id });
            }
            else if (user.role === 1) {
                info = await companyInfo.findOne({ user_id: id });
            }
            else if (user.role === 2) {
                info = await adminInfo.findOne({ user_id: id });
            }
            res.status(200).json({ success: true, info });
        } catch (error) {
            console.log(error)
            return res.status(403).json({ success: false, message: 'Invalid token' })
        }
    },
    logout: async (req, res) => {
        try {
            res.clearCookie('refreshtoken', { path: '/user/refresh_token' })
            return res.json({ msg: "Logged out." })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    updateUser: async (req, res) => {
        try {
            const { firstName, lastName, avatar, address, contact, description } = req.body;
            const user = await Users.findById(req.user.id).select('-password');
            let userId = '';
            if (user.role === 0) {
                userId = await userInfo.findOneAndUpdate({ user_id: req.user.id }, {
                    avatar, address, contact, description
                });
            }
            else if (user.role === 1) {
                userId = await companyInfo.findOneAndUpdate({ user_id: req.user.id }, {
                    firstName, lastName, avatar, address, contact, description
                });
            }

            res.json({ msg: "Update Success!" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    changePassword: async (req, res) => {
        try {
            const { oldPassword, newPassword } = req.body;
            const user = await Users.findById(req.user.id)
            const isMatch = await bcrypt.compare(oldPassword, user.password)
            if (!isMatch) return res.status(400).json({ msg: "Old Password is incorrect." })
            else {
                const passwordHash = await bcrypt.hash(newPassword, 12)
                await Users.findOneAndUpdate({ _id: req.user.id }, {
                    password: passwordHash
                })
            }

            res.json({ msg: "Password successfully changed!" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
}

const createActivationToken = (payload) => {
    return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, { expiresIn: '5m' })
}

const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET)
}

const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' })
}

module.exports = userCtrl;
