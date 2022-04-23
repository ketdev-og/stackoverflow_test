const express = require("express");
const { verifyAccessToken } = require("../../helper/jwt");
const createError = require("http-errors");
const { taskSchema, projectSchema } = require("../../helper/validation.schema");
const ProjectModel = require("../../models/Project.model");
const { createProject, getSingleProject, getAllProjects, updateProject, deleteProject } = require("../../controller/Project");

const router = express.Router();

router.post("/create", verifyAccessToken, createProject);

router.post("/get", verifyAccessToken, getSingleProject);

router.post("/get_projects", verifyAccessToken, getAllProjects);


router.post("/update", verifyAccessToken,updateProject)



router.post("/delete", verifyAccessToken, deleteProject)

module.exports = router;
