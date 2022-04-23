const mongoose = require("mongoose");
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema

const { default: isMobilePhone } = require("validator/lib/isMobilePhone");
const { default: isEmail } = require("validator/lib/isEmail");



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
    },
    roles:{
        type:Array
    },
    tasks:{
        pending:{ type:Array},
        inProcess:{ type:Array},
        completed:{ type:Array}
    },
    isAdmin:{
        type:Boolean,
        default:false
    }

})

UserSchema.pre('save', async function(next){
    try {
        const salt = await bcrypt.genSalt(10)
        const hashPass = await bcrypt.hash(this.password, salt)
        this.password = hashPass
        next()
    } catch (error) {
        next(error)
    }
})

UserSchema.methods.isValidPassword = async function (password){
    try {
       return await bcrypt.compare(password, this.password)
    } catch (error) {
        throw error
    }
}

module.exports = mongoose.model('User', UserSchema)