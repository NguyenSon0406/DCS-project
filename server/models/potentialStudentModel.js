
const mongoose = require('mongoose');
const {Schema} = mongoose;
const studentSchema = new mongoose.Schema({
    user_id: {
        type: Schema.Types.ObjectId, ref: 'userInfo'
    },
    highlight:{
        type: Number
    },
    numPost:{
        type: Number
    },
    GPA: {
        type: Number
    },
    skills: {
        type: Array
    }
},{
    timestamps: true
})

module.exports = mongoose.model("potentialStudent", studentSchema );