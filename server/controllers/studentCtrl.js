const userInfo = require('../models/userInfoModel')
const studentModel = require('../models/potentialStudentModel')

const studentCtrl = {
    getPotentialStudent: async (req,res) => {
        try {
            const liststudent = await studentModel.find().populate("user_id")
            res.json(liststudent)
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    }
}

module.exports = studentCtrl;