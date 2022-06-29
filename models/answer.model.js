const mongoose = require("mongoose")
const Schema = mongoose.Schema

const AnswerSchema =  new Schema({

    descriptions:{
        type: String,
        required:true
    },
    comments:{
        type:Array
    }

},{
    timestamps:true
})

module.exports = mongoose.model('Answers', AnswerSchema);