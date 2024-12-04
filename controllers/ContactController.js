const ContactService = require("../services/ContactService");

// Get all contacts (GET)
const getAllContacts = async (req, res) => {
  try {
    const result = await ContactService.getAllContacts();
    res.status(200).json(result); // Send all contacts
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get a single contact by ID (GET)
const getContactById = async (req, res) => {
    const { id } = req.params;
  
    // Validate ID format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: "Invalid ID format",
      });
    }
  
    try {
      const contact = await ContactService.getContactById(id);
      if (!contact) {
        return res.status(404).json({
          success: false,
          message: "Contact not found",
        });
      }
  
      res.status(200).json({
        success: true,
        data: contact,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  };
  

// Save contact details (POST)
const saveContactDetails = async (req, res) => {
  try {
    const result = await ContactService.saveContactDetails(req.body);
    res.status(201).json(result); // Send success response
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update an existing contact (PUT)
const updateContact = async (req, res) => {
  try {
    const { id } = req.params;
  
    // Validate ID format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: "Invalid ID format",
      });
    }
    const result = await ContactService.updateContact(id, req.body);
    res.status(200).json(result); // Send success response
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Delete a contact (DELETE)
const deleteContact = async (req, res) => {
  try {
    const result = await ContactService.deleteContact(req.params.id);
    res.status(200).json(result); // Send success response
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  getAllContacts,
  getContactById,
  saveContactDetails,
  updateContact,
  deleteContact,
};
