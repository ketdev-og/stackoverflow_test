const express = require("express");
const { verifyAccessToken } = require("../../helper/jwt");
const createError = require("http-errors");
const { taskSchema } = require("../../helper/validation.schema");
const TaskModel = require("../../models/Task.model");
const UserModel = require("../../models/User.model");
const { createTask, getSingleTask, updateTask, deleteTask } = require("../../controller/Task");

const router = express.Router();

router.post("/create", verifyAccessToken, createTask);

router.post("/get", verifyAccessToken, getSingleTask);

router.post("/update", verifyAccessToken, updateTask)

router.post("/delete", verifyAccessToken, deleteTask)

module.exports = router;
