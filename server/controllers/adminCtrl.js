const Users = require('../models/userModel')
const companyInfo = require('../models/companyModel')
const userInfo = require('../models/userInfoModel')

const adminCtrl =  {
    getStudents: async (req,res) => {
        try {
            const students = await userInfo.find({role : "0"});
            res.status(200).json(students)
        }catch(err){
            return res.status(500).json({msg: err.message});
        }
    },
    getInfoStudent: async (req,res) => {
        try {
            const students = await userInfo.findOne({user_id : req.params.id});
            res.status(200).json(students)
        }catch(err){
            return res.status(500).json({msg: err.message});
        }
    },
    getCompanies: async (req,res) => {
        try {
            const company = await companyInfo.find({role : "1"});
            res.json(company)
        }catch(err){
            return res.status(500).json({msg: err.message});
        }
    },
    getInfoCompanies: async (req,res) => {
        try {
            const companies = await companyInfo.findOne({user_id : req.params.id});
            res.status(200).json(companies)
        }catch(err){
            return res.status(500).json({msg: err.message});
        }
    },
    deleteStudents : async (req, res) => {
        try {
            await Users.findByIdAndDelete(req.params.id);
            await userInfo.findOneAndDelete({user_id:req.params.id});
            res.json({msg:"Deleted Successfully!"})
        } catch(err)
        {
            return res.status(500).json({msg: err.message});
        }
    },
    deleteCompany: async (req, res) => {
        try {
            await Users.findByIdAndDelete(req.params.id);
            await companyInfo.findOneAndDelete({user_id:req.params.id});
            res.json({msg:"Deleted Successfully!"})
        } catch(err)
        {
            return res.status(500).json({msg: err.message});
        }
    }
}

module.exports = adminCtrl;