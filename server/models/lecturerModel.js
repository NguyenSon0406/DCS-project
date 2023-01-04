
const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new mongoose.Schema({
    user_id: {
        type: Schema.Types.ObjectId, ref: 'Users'
    },
    email:{
        type: String,
    },
    role:{
        type: Number,
        default: 3 // 0 = student, 1 = IT Company, 2 = admin, 3 = Lecturer
    },
    avatar: {
        type: String,
        default: "https://res.cloudinary.com/dyqqjlozc/image/upload/v1664770107/user_tymt3d.png"
    },
},{
    timestamps: true
})

module.exports = mongoose.model("Lecturer", userSchema );