const express = require("express");
const { getQuestion, setQuestion, setAnswer, setComment } = require("../../controller/stack");
const router = express.Router();



router.get('/question', getQuestion);

router.post('/question', setQuestion);

router.post('/answer', setAnswer);

router.post('/comment', setComment);


module.exports = router