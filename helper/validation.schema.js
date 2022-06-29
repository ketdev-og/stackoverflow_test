const joi = require("@hapi/joi");

//http request validation 
const questionSchema = joi.object({
  title: joi.string().required(),
  descriptions: joi.string().required(),
});

const answerSchema = joi.object({
  question_id:joi.string().required(),
  descriptions: joi.string().required(),
});

const commentSchema = joi.object({
  request_id:joi.string().required(),
  descriptions: joi.string().required(),
});



module.exports = {
 questionSchema,
 answerSchema,
 commentSchema
};
