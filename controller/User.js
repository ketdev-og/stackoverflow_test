const express = require("express");
const createError = require("http-errors");
const User = require("../helper/AuthUser");
const UserModel = require("../models/User.model");
const router = express.Router()


//get a single user
const getUser =  async(req,res,next)=>{
    const userId = User(req)
   const authUser = await UserModel.findById(userId)
   if(!authUser) throw createError.NotFound('user not found')
   res.send({message:'authenticated user', user:authUser})
}


//get all users
const getAllUser =  async(req,res,next)=>{
   const Users = await UserModel.find()
   if(!Users) throw createError.Conflict()
   res.send({message:'ok', users:Users})
}


module.exports = {getAllUser, getUser}