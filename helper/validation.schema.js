const joi = require("@hapi/joi");

//http request validation 

const authSchema = joi.object({
  email: joi.string().email().lowercase().required(),
  password: joi.string().min(6).required(),
  fullName: joi.string().required(),
  mobile: joi.string().required(),
});

const loginSchema = joi.object({
  email: joi.string().email().lowercase().required(),
  password: joi.string().min(6).required(),
});

const taskSchema = joi.object({
  id: joi.optional(),
  project_id: joi.string().required(),
  title: joi.string().required(),
  descriptions: joi.string().required(),
  dates: joi.required(),
  status:joi.optional(),
  assigned_to:joi.required()
});

const projectSchema = joi.object({
  id: joi.optional(),
  title: joi.string().required(),
  descriptions: joi.string().required(),
  dates: joi.required(),
  isCompleted:joi.optional(),
  lead_id:joi.string().required()
});

module.exports = {
  authSchema,
  loginSchema,
  taskSchema,
  projectSchema
};
