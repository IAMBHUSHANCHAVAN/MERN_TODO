const { validationResult } = require("express-validator")
const { JsonMessage } = require("../utils/Helper")
const { StatusCode } = require("../utils/StatusCode")
const RegisterUser = require("../models/RegisterUser")
// const { RegisterSchema } = require("../Validation_Schema/RegisterValidation")
const todo = require("../models/todo")

const createTodo = async (req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.json(JsonMessage(StatusCode.validation_error,"todo is required",errors.mapped()))
    }

    try {
        const result = await todo.create({
            userId : req.userId,
            desc : req.body.desc

        })
        
        if(result){
            const user = await RegisterUser.findOneAndUpdate({_id : req.userId} ,{
                $push: {todos : result}
            });
            return res.json(JsonMessage(StatusCode.success_code,"todo created successfully ",result))
        }
    } catch (error) {
        res.send(JsonMessage(StatusCode.bad_request,"something went wrong",error))
    }

}
module.exports = {
    createTodo
}