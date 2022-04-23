const createError = require("http-errors");
const client = require("../helper/init_redis");
const { signAccessToken, signRefreshToken, verifyRefreshToken } = require("../helper/jwt");
const { authSchema, loginSchema } = require("../helper/validation.schema");
const UserModel = require("../models/User.model");


//register new user - generates access and refresh tokens 
const registerController = async (req, res, next) => {
  try {
    const result = await authSchema.validateAsync(req.body);

    const checkUser = await UserModel.findOne({ email: result.email });
    if (checkUser)
      throw createError.Conflict(`this email: ${result.email} already exist`);

    const user = new UserModel(result);
    const savedUser = await user.save();

    const accessToken = await signAccessToken(savedUser.id);

    const refreshToken = await signRefreshToken(savedUser.id);

    res.send({ accessToken, refreshToken });
  } catch (error) {
    if (error.isJoi === true) error.status = 422;
    next(error);
  }
};

//login exisiting user - generates access and refresh tokens 
const loginController =  async (req, res, next) => {
    try {
     const result = await loginSchema.validateAsync(req.body);
     const user = await UserModel.findOne({email:result.email})
     if(!user) throw createError.NotFound('user not registered')
   
   
   const isMatched = await user.isValidPassword(result.password)
   if(!isMatched) throw createError.Unauthorized('email or password incorrect')
   
   
   const accessToken = await signAccessToken(user.id)
   const refreshToken = await signRefreshToken(user.id)
     
   res.send({accessToken, refreshToken})
    
   } catch (error) {
      if(error.isJoi === true) return next(createError.BadRequest('invalid email or  password'))
      next(error)
    }
   }



   //generate new refresh token
   const refreshTokenController = async (req, res, next) => {
    try {
      const {refreshToken}  = req.body 
    
      
      if(!refreshToken) throw createError.BadRequest()
      const userId = await verifyRefreshToken(refreshToken)
      
      const access_token = await signAccessToken(userId)
      const refresh_token = await signRefreshToken(userId)
  
      res.send({access_token, refresh_token})
    } catch (error) {
      next(error)
    }
  }


  //logout authenticated user
  const logout = async (req, res, next) => {
    try{
      const {refreshToken} = req.body
      if(!refreshToken) throw createError.BadRequest()
     const userId =  await verifyRefreshToken(refreshToken)
     
     await client.del(userId, (err, val)=>{
       if(err){
         console.log(err.message);
         throw createError.InternalServerError()
       }
     
     }).then(()=>{
      return res.sendStatus(204)
     })
    
    }catch(error){
      next(error)
    }
  }

module.exports = {registerController, loginController, refreshTokenController, logout}