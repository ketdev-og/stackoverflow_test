const mongoose = require("mongoose")
const Schema = mongoose.Schema

const QuestionSchema =  new Schema({
    title:{
        type:String,
        required:true
    },
    descriptions:{
        type: String,
        required:true
    },
    answers:{
        type:Array
    },
    comments:{
        type:Array
    }

},{
    timestamps:true
})

module.exports = mongoose.model('Questions', QuestionSchema);