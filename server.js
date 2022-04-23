const express = require("express");
require('./helper/init_mongo') 
require('./helper/init_redis') 
require('./helper/generate_keys')
const createError = require("http-errors");
const morgan = require("morgan");
const fs = require('fs');
const path = require('path')
require('dotenv').config()
const AuthRoute = require('./api/v1/Auth');
const UserRoute = require('./api/v1/User');
const TaskRoute = require('./api/v1/Task');
const ProjectRoute = require('./api/v1/Project')
const { verifyAccessToken } = require("./helper/jwt");
const { log } = require("console");

//init express
const app = express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//http logs ('./access.log)
var accessLog = fs.createWriteStream(path.join(__dirname, 'access.log'),{flags:'a'});
app.use(morgan('combined', {stream:accessLog}));

//test route
app.get('/', verifyAccessToken, async(req,res,next)=>{
    console.log(req.payload);
    res.send('v1 api successful')
})


//app routes
app.use('/v1/auth', AuthRoute)
app.use('/v1/user', UserRoute)
app.use('/v1/task', TaskRoute)
app.use('/v1/project', ProjectRoute)


//error handler
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