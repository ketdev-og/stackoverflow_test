
const express = require("express");
const router = express.Router();


router.post('/register', async(req, res, next)=>{
    res.send("register route")
});

router.post('/login', async(req, res, next)=>{
    res.send("login route")
});

router.post('/ref_tk', async(req, res, next)=>{
    res.send("refresh token route")
})

router.post('/logout', async(req, res, next)=>{
    res.send("logout route")
})

module.exports = router
