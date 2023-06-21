const mongoose = require("mongoose")

const todoSchema = mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : "User"
    }, 
    desc :{
        type : String,
        require : true,

    },
    isCompleted : {
        type : Boolean , 
        require : true,
        default : false
    },
    date : {
        type : Date,
        default : Date.now
    }
})

module.exports = mongoose.model("todo",todoSchema)