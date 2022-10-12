
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
    }
},{
    timestamps: true
})

module.exports = mongoose.model("userInfo", userInfoSchema );