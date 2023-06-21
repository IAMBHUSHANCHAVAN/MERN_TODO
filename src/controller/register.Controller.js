const { validationResult } = require("express-validator")
const { JsonMessage, JWT_TOKEN } = require("../utils/Helper")
const { StatusCode } = require("../utils/StatusCode")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const RegisterUser = require("../models/RegisterUser")
const Register = async (req, res) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        const { name, username, password, email } = req.body;

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        // checking if user exists
        const userExist = await RegisterUser.findOne({
            $or: [{
                email: email, username: username
            }]
        });
        if (userExist) {
            return res.json(JsonMessage(StatusCode.unprocessed_entity, "user already Exists"))
        }

        // save to db 
        try {
            const result = await RegisterUser.create({
                name: name,
                username: username,
                password: hashPassword,
                email: email
            })

            // accessing JWT token
            const token = jwt.sign({userId:result._id},JWT_TOKEN)
            res.send(JsonMessage(StatusCode.success_code, "register successfully done", {userId:result._id,token:token}))
        }
        
        catch (error) {
            console.log(error);
        }
    }
    else { res.send(JsonMessage(StatusCode.validation_error, "Validation error", errors.mapped())) }

}
module.exports = {
    Register
}