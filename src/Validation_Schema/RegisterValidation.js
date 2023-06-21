const RegisterValidation = require("express-validator")
 const RegisterSchema = [
    RegisterValidation.check("name").trim().isAlpha().withMessage("name should be Alphebatic only").isLength({min:1,max:32}),
    RegisterValidation.check("username","username is required ! min 6 characters").exists().isAlphanumeric().withMessage("should be alphaNumeric Character").trim().isLength({min:6,max:32}),
    RegisterValidation.check("password","password is required").isLength({min:6,max:32}).trim().withMessage("should be not less than 6 or more than 32"),
    RegisterValidation.check("email","email is required").exists().isEmail()
 ]
 module.exports = {
    RegisterSchema
 }