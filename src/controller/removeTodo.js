const { validationResult } = require("express-validator")
const todo = require("../models/todo")
const RegisterUser = require("../models/RegisterUser")
const { JsonMessage } = require("../utils/Helper")
const { StatusCode } = require("../utils/StatusCode")

const removeTodo = async (req,res)=>{
    const error = validationResult(req)
    if(!error.isEmpty()){
        return res.json(JsonMessage(StatusCode.validation_error, "todo id is required", error.mapped()))
    }
    try {
        const remove = await todo.findOneAndRemove({_id:req.body.todo_id,userId: req.userId})
    
        if (remove) {
            const user = await RegisterUser.findByIdAndUpdate({_id:req.userId},{
                $pull:{
                    todos : req.body.todo_id
                }
            })
            return res.json(JsonMessage(StatusCode.success_code,"todo deleted sucessfully",null))
        }
    } catch (error) {
        return res.json(JsonMessage(StatusCode.unprocessed_entity, "todo id is required", error))
}

}
module.exports = {
    removeTodo
}