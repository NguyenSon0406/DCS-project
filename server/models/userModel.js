
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: {
        type: String
        
    },
    email:{
        type: String,
        require: [true," Please enter your email!"]
    },
    password: {
        type: String,
        require: [true," Please enter your password!"]
    },
    role:{
        type: Number,
        default: 0 // 0 = student, 1 = IT Company, 2 = admin, 3 = Lecturer
    },
    avatar: {
        type: String,
        default: "https://res.cloudinary.com/dyqqjlozc/image/upload/v1664770107/user_tymt3d.png"
    },
    isVerify:{
        type: Boolean,
        default: false,
    }
},{
    timestamps: true
})

module.exports = mongoose.model("Users", userSchema );