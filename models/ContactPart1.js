const mongoose = require("mongoose");

// Define the first part of the contact schema
const contactPart1Schema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    default: () => new mongoose.Types.ObjectId().toString(),
  },
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    lowercase: true,
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
    trim: true,
  },
  state: {
    type: String,
    required: [true, "State is required"],
    trim: true,
  },
});

const ContactPart1 = mongoose.model("ContactPart1", contactPart1Schema);

module.exports = ContactPart1;
