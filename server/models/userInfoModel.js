
const mongoose = require('mongoose');

const userInfoSchema = new mongoose.Schema({
    user_id: {
        type: String
    },
    firstName:{
        type: String
    },
    lastName:{
        type: String
    },
    email:{
        type: String
    },
    contact: {
        type: String
    },
    className:{
        type: String    
    },
    falculty: {
        type: String
    },
    gender:{
        type: String
    },
    address:{
        type: String
    },
    dayofbirth:{
        type: Date
    },
    avatar: {
        type: String,
        default: "https://res.cloudinary.com/dyqqjlozc/image/upload/v1664770107/user_tymt3d.png"
    },
    description:{
        type: String
    },
    role:{
        type: Number
    },
},{
    timestamps: true
})

module.exports = mongoose.model("userInfo", userInfoSchema );