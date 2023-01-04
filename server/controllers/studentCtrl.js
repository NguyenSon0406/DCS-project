const userInfo = require('../models/userInfoModel')
const studentModel = require('../models/potentialStudentModel')
const postModel = require('../models/postModel')
const studentCtrl = {
    getPotentialStudent: async (req,res) => {
        try {
            const liststudent = await studentModel.find().populate("user_id")
            res.json(liststudent)
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },
    countPosts: async (req,res) => {
        try {
            const countPost = await postModel.count({user_id: req.params.id})
            const {_id} = req.body;
            await studentModel.findByIdAndUpdate({_id:_id},{
                numPost: countPost,highlight: countPost*10
            })
            res.json(countPost)
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },
}

module.exports = studentCtrl;