const mongoose = require("mongoose");

// Define the second part of the contact schema
const contactPart2Schema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  city: {
    type: String,
    required: [true, "City is required"],
    trim: true,
  },
  zipCode: {
    type: String,
    required: [true, "Zip Code is required"],
    trim: true,
  },
  message: {
    type: String,
    required: [true, "Message is required"],
    trim: true,
  },
  subject: {
    type: String,
    required: [true, "Subject is required"],
    trim: true,
  },
  address: {
    type: String,
    required: [true, "Address is required"],
    trim: true,
  },
});

const ContactPart2 = mongoose.model("ContactPart2", contactPart2Schema);

module.exports = ContactPart2;
