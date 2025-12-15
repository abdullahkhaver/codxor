const mongoose = require('mongoose');
const ApiResponse = require('../utils/apiResponse');
const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
    ApiResponse.success("Connected To MongoDB SuccessFully" , 200)
  } catch (error) {
    console.log('Error connecting to MongoDB:', error.message);
  }
};

module.exports = connectToMongoDB;

