const { validationResult } = require("express-validator")
const { JsonMessage, JWT_TOKEN } = require("../utils/Helper")
const { StatusCode } = require("../utils/StatusCode")
const RegisterUser = require("../models/RegisterUser")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const login = async(req,res)=>{
const errors = validationResult(req)
if (errors.isEmpty()) {
    const {username , password}=req.body
    
const userExist = await RegisterUser.findOne({username : username})
if (!userExist) {
  return res.json(
    JsonMessage(StatusCode.unprocessed_entity, "User not found. Check the credentials.")
  );
}

const verified = await bcrypt.compare(password, userExist.password);
if (!verified) {
  return res.json(
    JsonMessage(StatusCode.unauthorized, "Invalid password. Please try again.")
  );
}

const token = jwt.sign({ userId: userExist._id }, JWT_TOKEN);
console.log(token);
return res.json(
  JsonMessage(
    StatusCode.success_code,
    "Login successful",
    { userId: userExist._id, token: token }
  )
);
} else {
return res.json(
  JsonMessage(StatusCode.bad_request, "Invalid input data", errors)
);
}
};

module.exports = {
    login
}