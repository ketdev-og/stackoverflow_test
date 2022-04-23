const express = require("express");
const { loginController, refreshTokenController, logout, registerController } = require("../../controller/Auth");
const router = express.Router();


router.post("/register", registerController);

router.post("/login", loginController);

router.post("/reftk", refreshTokenController);

router.post("/logout", logout);

module.exports = router;
