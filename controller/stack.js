const createError = require("http-errors");
const { responseOk, responseError } = require("../helper/response");
const {
  questionSchema,
  answerSchema,
  commentSchema,
} = require("../helper/validation.schema");
const questionModel = require("../models/question.model");
const answerModel = require("../models/answer.model");
const commentModel = require("../models/comment.model");
const { getRedis } = require("../helper/autoload_data");

//get stcak questions on redis
const getQuestion = async (req, res, next) => {
  try {
    const data = getRedis("questions").then((result) => {
      res.send(responseOk(result, 200));
    });
  } catch (error) {
    res.send(responseError(error.message, 500));
  }
};


//save stack questions to mongodb
const setQuestion = async (req, res, next) => {
  saveQuestion(req, res);
};

//save stack answers to mongodb
const setAnswer = async (req, res, next) => {
  saveAnswer(req, res);
};


//save comments to mongo db
const setComment = async (req, res, next) => {
  saveComment(req, res);
};



const saveQuestion = async (req, res) => {
  try {
    //save to question table
    const requests = await questionSchema.validateAsync(req.body);
    const question = new questionModel(requests);
    const savedQuestion = await question.save();
    if (!savedQuestion) throw createError.Conflict();

    //http response
    res.send(responseOk(savedQuestion, 200));
  } catch (error) {
    res.send(responseOk(error.message, 404));
  }
};

const saveAnswer = async (req, res) => {
  try {
    //save to answer table
    const requests = await answerSchema.validateAsync(req.body);
    const answer = new answerModel(requests);
    const savedAnswer = await answer.save();
    if (!savedAnswer) throw createError.Conflict();

    //update question with answer
    const question_id = req.body.question_id;
    if (!question_id) throw createError.BadRequest("question not found");
    const model = await questionModel.findById(question_id);
    if (!model) throw createError.Conflict();
    const updateAnswer = [...model.answers, savedAnswer.id];
    model.answers = updateAnswer;
    await model.save();

    //http response
    res.send(responseOk(savedAnswer, 200));
  } catch (error) {
    res.send(responseOk(error.message, 404));
  }
};

const saveComment = async (req, res) => {
  try {
    //save to comment table
    const requests = await commentSchema.validateAsync(req.body);
    const comment = new commentModel(requests);
    const savedComment = await comment.save();
    if (!savedComment) throw createError.Conflict();

    //update question or answer with comment
    const request_id = req.body.request_id;
    if (!request_id) throw createError.BadRequest("question not found");
    const model =
      (await questionModel.findById(request_id)) ||
      (await answerModel.findById(request_id));
    if (!model) throw createError.Conflict();
    const updateComment = [...model.comments, savedComment.id];
    model.comments = updateComment;
    await model.save();

    //http response
    res.send(responseOk(savedComment, 200));
  } catch (error) {
    res.send(responseOk(error.message, 404));
  }
};

module.exports = { getQuestion, setQuestion, setAnswer, setComment };
