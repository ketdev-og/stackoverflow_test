const express = require("express");
require('./helper/init_mongo')
require('./helper/init_redis')

const createError = require("http-errors");
const morgan = require("morgan");
const fs = require('fs');
const path = require('path')
require('dotenv').config()
const AuthRoute = require('./api/v1/Auth');
const { verifyAccessToken } = require("./helper/jwt");
const { log } = require("console");


const app = express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))


var accessLog = fs.createWriteStream(path.join(__dirname, 'access.log'),{flags:'a'});
app.use(morgan('combined', {stream:accessLog}));



app.get('/', verifyAccessToken, async(req,res,next)=>{
    console.log(req.payload);
    res.send('v1 api successful')
})

app.use('/v1/auth', AuthRoute)


app.use(async(req,res,next)=>{
    next(createError.NotFound());
});

app.use((err,req,res,next)=>{
    res.status(err.status || 500)
    res.send({
        error:{
            status: err.status || 500,
            message: err.message

        }
    })
})

const PORT = process.env.PORT || 3000;


app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`);
})