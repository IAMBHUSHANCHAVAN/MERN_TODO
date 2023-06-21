const JsonMessage = (statuscode,message,data)=>{
    return {
        status : statuscode , message:message,data:data
    }
}
const JWT_TOKEN = "bhushanchavan976"
module.exports = {
    JsonMessage,JWT_TOKEN
}