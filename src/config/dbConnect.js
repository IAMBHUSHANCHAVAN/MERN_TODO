const mongoose = require('mongoose');
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGOOSE_URL);
        console.log("---mongodb-connect------");
    } catch (error) {
        console.log(error);
        throw error;
    }
};

module.exports = connectDB;