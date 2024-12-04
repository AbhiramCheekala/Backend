const mongoose = require("mongoose");
require("dotenv").config(); // Load environment variables from .env file

const connectToDatabase = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI; // Access URI from environment variable

    if (!mongoURI) {
      console.error("MongoDB URI is not defined in the .env file.");
      process.exit(1); // Exit process if URI is missing
    }

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err.message);
    process.exit(1); // Exit the process on failure
  }
};

module.exports = connectToDatabase;
