const express = require("express");
const createError = require("http-errors");
const { taskSchema } = require("../helper/validation.schema");
const TaskModel = require("../models/Task.model");
const UserModel = require("../models/User.model");

const router = express.Router();


//create new task
const createTask = async (req, res, next) => {
  try {
    const result = await taskSchema.validateAsync(req.body);
    const task = new TaskModel(result);
    const savedTask = await task.save();
    if(!savedTask) throw createError.Conflict()
    const asign = savedTask.assigned_to
    if(!asign) throw createError.Conflict()
    const User = await UserModel.findById(asign)
    if(!User) throw createError.Conflict("User not found for task assginment")
    const newTask = [...User.tasks.pending, savedTask.id]
    User.tasks.pending = newTask
    await User.save();
    res.send({ message: "task saved successfull", task: savedTask });
  } catch (error) {
    if (error.isJoi === true) return next(createError.BadRequest());
    next(error);
  }
}


//get a single task using id
const getSingleTask = async (req, res, next) => {
  try {
    const result = req.body;
    const id = result.id;
    if(!id) throw createError.BadRequest()
    const Task = await TaskModel.findById(id);
    if (!Task) throw createError.NotFound();
    res.send({ message: "task found", task: Task });
  } catch (error) {
    next(error);
  }
}


//update tasks
const updateTask = async(req, res, next)=>{
    try {
        const result = await taskSchema.validateAsync(req.body);
        const id = result.id;
        if(!id) throw createError.BadRequest()
       const Task = await TaskModel.findByIdAndUpdate(id,result)
       if(!Task) throw createError.Conflict()
       res.send({message:"task updated successfully"})

    } catch (error) {
        if(error.isJoi === true) return next(createError.BadRequest())
        next(error)
    }
}


//delete task
const deleteTask = async(req, res, next)=>{
    try {
        const result = req.body
        const id = result.id
        if(!id) throw createError.BadRequest()
        const Task = await TaskModel.findByIdAndDelete(id)
        if(!Task) throw createError.Conflict()
        res.send({message:"task deleted successfully"})
    } catch (error) {
        next(error)
    }
}

module.exports = {createTask, deleteTask, updateTask, getSingleTask}
