

const mongoose = require("mongoose")
const RegisterUser = mongoose.Schema({
    name:{
        type : String,
        required : true,
        min : 1,
        max : 16
    },
    username:{
        type : String,
        required : true,
        min : 1,
        max : 16
    },
    password:{
        type : String,
        required : true,
        min :6,
        max :12
    },
    email:{
        type : String,
        required : true,
        min : 1,
        max : 16
    },
    todos:[{
        type : mongoose.Schema.Types.ObjectId,
        ref : "todo"
    }],
    date:{
        type: Date,
        default : Date.now 
    }
})
module.exports = mongoose.model("User",RegisterUser)

