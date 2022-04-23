const express = require("express");
const createError = require("http-errors");
const { getUser, getAllUser } = require("../../controller/User");
const User = require("../../helper/AuthUser");
const { verifyRefreshToken, verifyAccessToken } = require("../../helper/jwt");
const UserModel = require("../../models/User.model");
const router = express.Router()



router.get('/', verifyAccessToken, getUser)

router.get('/all', verifyAccessToken, getAllUser)


module.exports = router