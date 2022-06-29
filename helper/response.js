const responseOk = (res,code)=>{
    return {
        status:code,
        message:"ok",
        response:res
    }
}

const responseError = (res,code)=>{
    return {
        status:code,
        message:"error",
        response:res
    }
}

module.exports = {responseOk, responseError}