
const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new mongoose.Schema({
    id:{
      type: String  
    },
    user_id: {
        type: Schema.Types.ObjectId, ref: 'Users'
    },
    email:{
        type: String,
        require: [true," Please enter your email!"]
    },
    role:{
        type: Number,
        default: 2 // 0 = student, 1 = IT Company, 2 = admin, 3 = Lecturer
    },
    avatar: {
        type: String,
        default: "https://res.cloudinary.com/dyqqjlozc/image/upload/v1664770107/user_tymt3d.png"
    },
},{
    timestamps: true
})

module.exports = mongoose.model("Admin", userSchema );