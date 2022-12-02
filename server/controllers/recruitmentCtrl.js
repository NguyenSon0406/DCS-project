const Users = require('../models/userModel')
const recruitmentPost = require('../models/recruitmentPostModel')
const companyInfo = require('../models/companyModel')

const recruitmentCtrl = {
    postRecruitment: async(req,res) => {
        try {

            const {title,avatar,companyName,link,type,location,address,skills,description} = req.body;
            const newPost = new recruitmentPost({
                user_id:req.user.id,title,avatar,companyName,link,type,location,address,skills,description
            });
            newPost.save();
            res.json({msg:"Post Successfully!"})
        }catch(err) {
            return res.status(500).json({msg: err.message});
        }
    },
    getPostRecruitment: async(req,res) => {
        try {
            const posts = await recruitmentPost.find();
            res.json(posts)
        }catch(err){
            return res.status(500).json({msg: err.message});
        }
    },
    deleteRecruitment: async(req,res) =>{
        try{
            await recruitmentPost.findByIdAndDelete(req.params.id);
            res.json({msg:"Deleted Successfully!"})
        }
        catch(err) {
            return res.status(500).json({msg: err.message});
        }
    },
    getPostByID: async(req,res) => {
        try {
            const posts = await recruitmentPost.find({user_id: req.user.id});
            res.json(posts)
        }catch(err){
            return res.status(500).json({msg: err.message});
        }
    },
    updateRecruitment: async (req,res) => {
        try {
            const {title,type,link,location,skills,description} = req.body;
            await recruitmentPost.findByIdAndUpdate(req.params.id,{
                title,type,link,location,skills,description
            })
            res.json({msg:"Update Successfully"})
        }catch (err){
            return res.status(500).json({msg: err.message});
        }
    }
}

module.exports = recruitmentCtrl;