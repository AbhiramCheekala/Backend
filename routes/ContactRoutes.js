// const express = require("express");
// const ContactController = require("../controllers/ContactController");

// const router = express.Router();

// // Get all contacts
// router.get("/contacts", ContactController.getAllContacts);

// // Get a single contact by ID
// router.get("/contact/:id", ContactController.getContactById);

// // Save a new contact
// router.post("/contact", ContactController.saveContactDetails);

// // Update an existing contact by ID
// router.put("/contact/:id", ContactController.updateContact);

// // Delete a contact by ID
// router.delete("/contact/:id", ContactController.deleteContact);

// module.exports = router;


const express = require("express");
const {
  createContact,
  getContact,
  getAllContacts,
  updateContact,
  deleteContact,
} = require("../controllers/ContactController");

const router = express.Router();

// Routes for contact operations
router.post("/contacts", createContact); // Create a contact
router.get("/contacts", getAllContacts); // Get all contacts
router.get("/contacts/:id", getContact); // Get a contact by ID
router.put("/contacts/:id", updateContact); // Update a contact by ID
router.delete("/contacts/:id", deleteContact); // Delete a contact by ID

module.exports = router;

