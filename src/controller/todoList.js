const RegisterUser = require("../models/RegisterUser")
const { JsonMessage } = require("../utils/Helper")
const { StatusCode } = require("../utils/StatusCode")


const todoList = async (req , res)=>{
    try {
        const list = await RegisterUser.findById(req.userId)
          .select("-password")
          .populate('todos')
          .exec();
      
        return res.json(JsonMessage(StatusCode.success_code, "all todos fetched", list));
      } catch (error) {
        return res.json(JsonMessage(StatusCode.unprocessed_entity, "error occurred", error));
      }
      
    
}

module.exports = {
    todoList
}