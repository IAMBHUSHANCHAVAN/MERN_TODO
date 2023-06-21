const { JsonMessage, JWT_TOKEN } = require("../utils/Helper")
const { StatusCode } = require("../utils/StatusCode")
const jwt = require("jsonwebtoken")

const authMiddleware = (req,res,next)=>{
    if(req.headers['auth']===undefined){
        return res.json(JsonMessage(StatusCode.auth_error,"accsess denied"))
    }
    const token = req.headers['auth']
    try {
        const decoding = jwt.verify(token,JWT_TOKEN)
        console.log(decoding);
        req.userId = decoding.userId
        return next()
    } catch (error) {
       return res.json(JsonMessage(StatusCode.unprocessed_entity,"invalid token"))
    }
}

module.exports = {
    authMiddleware
}