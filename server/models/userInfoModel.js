
const mongoose = require('mongoose');

const userInfoSchema = new mongoose.Schema({
    user_id: {
        type: String
        
    },
    name:{
        type: String
    },
    email:{
        type: String
    },
    contact: {
        type: String
    },
    class:{
        type: String
        
    },
    falculty: {
        type: String
    },
    avatar: {
        type: String,
        default: "https://res.cloudinary.com/dyqqjlozc/image/upload/v1664770107/user_tymt3d.png"
    }
},{
    timestamps: true
})

module.exports = mongoose.model("userInfo", userInfoSchema );