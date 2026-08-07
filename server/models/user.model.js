const mongoose= require('mongoose');

const userSchema=new mongoose.Schema({

    userName:{
        type: String,
        required: true,
    },

    userEmail:{
        type: String,
        required: true,
        unique: true,
    },

    codeforcesHandle:{
        type: String,
        required: true,
        unique: true,
    },

    userPassword:{
        type: String,
        required: true,
    },

},{timestamps:true});

module.exports = mongoose.model("User", userSchema);
