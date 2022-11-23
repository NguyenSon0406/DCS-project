const mongoose = require('mongoose');
const {Schema} = mongoose;
const RecruitmentPostSchema = new mongoose.Schema({
    user_id: {
        type: Schema.Types.ObjectId, ref: 'CompanyInfor'
    },
    title: {
        type: String
    },
    companyName: {
        type: String
    },
    link:{
        type: String    
    },
    type:{
        type: String
    },
    location:{
        type: String
    },
    skills: {
        type: Array
    },
    address:{
        type: String
    },
    avatar: {
        type: String,
    },
    description:{
        type: String
    },
},{
    timestamps: true
})

module.exports = mongoose.model("recruimentPost", RecruitmentPostSchema );