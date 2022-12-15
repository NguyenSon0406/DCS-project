const Users = require('../models/userModel')
const postModel = require('../models/postModel')
const companyInfo = require('../models/companyModel')
const postCtrl = {
    postArticle: async(req,res) => {
        try {

            const {title,avatar,name,image,skills,description} = req.body;
            const newPost = new postModel({
                user_id:req.user.id,title,avatar,name,img:image,skills,description
            });
            newPost.save();
            res.json({msg:"Post Successfully!"})
        }catch(err) {
            return res.status(500).json({msg: err.message});
        }
    },
    getPostArticle: async(req,res) => {
        try {
            const posts = await postModel.find();
            res.json(posts)
        }catch(err){
            return res.status(500).json({msg: err.message});
        }
    },
    deleteArticle: async(req,res) =>{
        try{
            await postModel.findByIdAndDelete(req.params.id);
            res.json({msg:"Deleted Successfully!"})
        }
        catch(err) {
            return res.status(500).json({msg: err.message});
        }
    },
    getArticleByID: async(req,res) => {
        try {
            const posts = await postModel.find({user_id: req.user.id});
            res.json(posts)
        }catch(err){
            return res.status(500).json({msg: err.message});
        }
    },
    updateArticle: async (req,res) => {
        try {
            const {title,tempImg,skills,description} = req.body;
            await postModel.findByIdAndUpdate(req.params.id,{
                title,img:tempImg,skills,description
            })
            res.json({msg:"Update Successfully"})
        }catch (err){
            return res.status(500).json({msg: err.message});
        }
    }
}
module.exports = postCtrl;