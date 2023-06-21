const express = require("express")
const { Register } = require("../controller/register.Controller")
const { RegisterSchema } = require("../Validation_Schema/RegisterValidation")
const { login } = require("../controller/loginController")
const { loginSchema } = require("../Validation_Schema/loginValidation")
const { createTodo } = require("../controller/todoController")
const { check } = require("express-validator")
const { todoList } = require("../controller/todoList")
const { markTodo } = require("../controller/markTodo")
const { removeTodo } = require("../controller/removeTodo")
const apiRoute = express.Router()
const apiProtected = express.Router()
apiRoute.post("/Register",RegisterSchema,Register)
apiRoute.post("/login",loginSchema,login)
// protected routes
apiProtected.post("/createTodo",[check("desc","todo desc is required").exists()],createTodo);
apiProtected.post("/marktodo",[check("todo_id","todo id is required").exists()],markTodo);
apiProtected.get("/todolist",todoList);
apiProtected.post("/removetodo",removeTodo);
module.exports = {apiRoute , apiProtected}