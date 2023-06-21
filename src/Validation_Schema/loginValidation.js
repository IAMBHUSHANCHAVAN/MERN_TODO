const RegisterValidation = require("express-validator")
 const loginSchema = [
    RegisterValidation.check("username","username is required").exists().isAlphanumeric().withMessage("should be alphaNumeric Character").trim().isLength({min:6,max:32}),
    RegisterValidation.check("password","password is required").isLength({min:6,max:32}).trim().withMessage("should be not less than 6 or more than 32"),
 ]
 module.exports = {
    loginSchema
 }