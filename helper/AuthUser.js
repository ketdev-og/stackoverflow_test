
const User = (req)=> {
   const  AuthUser = req.payload
    if(!AuthUser) throw createError.Unauthorized()
    const User = AuthUser.aud
    console.log(User);
    return User

} 

module.exports = User

