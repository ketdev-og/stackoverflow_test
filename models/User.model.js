const mongoose = require("mongoose");
const Schema = mongoose.Schema
const validate = require('validator');
const { default: isMobilePhone } = require("validator/lib/isMobilePhone");
const { default: isEmail } = require("validator/lib/isEmail");
const { options } = require("nodemon/lib/config");


const UserSchema = new Schema({
    email:{
        type:String,
        required:true,
        lowercase:true,
        unique:true,
        trim:true,
        validate: {
            validator: isEmail,
            message:'invalid email address',
            isAsync:false
        }
    },

    fullName:{
        type:String,
        required:true,
    },

    mobile:{
        type:String,
        trim:true,
        validate:{
            validator:isMobilePhone
        },
        required:true
    },
    password:{
        type:String,
        required:true,
        min:8
    }





})