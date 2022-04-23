const express = require("express");
const createError = require("http-errors");
const {projectSchema } = require("../helper/validation.schema");
const ProjectModel = require("../models/Project.model");

const router = express.Router();


//create project
const createProject = async (req, res, next) => {
  try {
    const result = await projectSchema.validateAsync(req.body);
    const project = new ProjectModel(result);
    const savedProject = await project.save();
    if(!savedProject) throw createError.Conflict()
    res.send({ message: "project saved successfully*", task: savedProject });
  } catch (error) {
    if (error.isJoi === true) return next(createError.BadRequest());
    next(error);
  }
}


//get single project by id
const getSingleProject = async (req, res, next) => {
  try {
    const result = req.body;
    const id = result.id;
    if(!id) throw createError.BadRequest()
    const Project = await ProjectModel.findById(id);
    if (!Project) throw createError.NotFound();
    res.send({ message: "project found", project: Project });
  } catch (error) {
    next(error);
  }
}


//get all projects
const getAllProjects = async (req, res, next) => {
  try {
    const Project = await ProjectModel.find();
    if (!Project) throw createError.NotFound();
    res.send({ message: "project found", project: Project });
  } catch (error) {
    next(error);
  }
}

//update single project
const updateProject = async(req, res, next)=>{
    try {
        const result = await projectSchema.validateAsync(req.body);
        const id = result.id;
        if(!id) throw createError.BadRequest()
       const Project = await ProjectModel.findByIdAndUpdate(id,result)
       if(!Project) throw createError.Conflict()
       res.send({message:"project updated successfully"})

    } catch (error) {
        if(error.isJoi === true) return next(createError.BadRequest())
        next(error)
    }
}


// delete project
const deleteProject = async(req, res, next)=>{
    try {
        const result = req.body
        const id = result.id
        if(!id) throw createError.BadRequest()
        const Project = await ProjectModel.findByIdAndDelete(id)
        if(!Project) throw createError.Conflict()
        res.send({message:"task deleted successfully"})
    } catch (error) {
        next(error)
    }
}
module.exports = {createProject, getAllProjects, getSingleProject, deleteProject, updateProject};
