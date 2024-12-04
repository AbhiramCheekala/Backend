const mongoose = require("mongoose");

// Define the contact schema
const contactSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      default: () => new mongoose.Types.ObjectId().toString(), // Use MongoDB ObjectId as string
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: [3, "Name must be at least 3 characters long"],
      maxlength: [50, "Name cannot exceed 50 characters"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: [/.+@.+\..+/, "Please provide a valid email address"],
      trim: true,
      lowercase: true,
      unique: true, // Ensure no duplicate emails
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      minlength: [10, "Message must be at least 10 characters long"],
      maxlength: [500, "Message cannot exceed 500 characters"],
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      immutable: true, // Ensure this field cannot be updated
    },
  },
  {
    timestamps: true, // Automatically add `createdAt` and `updatedAt`
  }
);

// Add indexes
// contactSchema.index({ email: 1 });
// contactSchema.index({ id: 1 });

// Create the Contact model
const ContactModel = mongoose.model("Contact", contactSchema);

module.exports = ContactModel;
