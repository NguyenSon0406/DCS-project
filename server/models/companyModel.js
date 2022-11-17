
const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new mongoose.Schema({
    id: {
        type: String
        
    },
    user_id: {
        type: Schema.Types.ObjectId, ref: 'Users' 
    },
    firstName:{
        type: String
    },
    lastName:{
        type: String
    },
    companyName: {
        type: String
    },
    email:{
        type: String
    },
    contact: {
        type: String
    },
    address:{
        type: String
    },
    avatar: {
        type: String,
        default: "https://res.cloudinary.com/dyqqjlozc/image/upload/v1664770107/user_tymt3d.png"
    },
    description:{
        type: String
    },
    role:{
        type: Number,
        default:1
    },
},{
    timestamps: true
})

module.exports = mongoose.model("CompanyInfor", userSchema );