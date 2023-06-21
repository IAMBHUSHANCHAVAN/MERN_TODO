const { validationResult } = require("express-validator")
const { JsonMessage } = require("../utils/Helper")
const { StatusCode } = require("../utils/StatusCode")
const todo = require("../models/todo")


const markTodo = async (req, res) => {
    const error = validationResult(req)
    if (!error.isEmpty()) {
        return res.json(JsonMessage(StatusCode.validation_error, "todo id is required", error.mapped()))
    }

    try {
        const Todo = await todo.findOneAndUpdate({ 
            _id: req.body.todo_id,
            userId: req.userId
        }, [
            {
                $set: {
                    isCompleted: {
                        $eq: [false, "$isCompleted"]
                    }
                },
            },
        ]);
        if (Todo) {
            return res.json(JsonMessage(StatusCode.success_code, "updates", Todo))
        }
    } catch (error) {
        return res.json(JsonMessage(StatusCode.unprocessed_entity, "todo id is required", error))
}
};

module.exports = {
    markTodo
}