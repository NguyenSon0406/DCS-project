const mongoose = require('mongoose');
const {Schema} = mongoose;
const PostSchema = new mongoose.Schema({
    user_id: {
        type: Schema.Types.ObjectId, ref: 'Users'
    },
    name: {
        type: String
    },
    avatar: {
        type: String,
    },
    title: {
        type: String
    },
    skills: {
        type: Array
    },
    img:{
        type: String
    },
    description:{
        type: String
    },
},{
    timestamps: true
})

module.exports = mongoose.model("Post", PostSchema );