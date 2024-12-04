const ContactModel = require("../models/ContactModel");

// Fetch all contacts
async function getAllContacts() {
  try {
    const contacts = await ContactModel.find();
    return { success: true, data: contacts };
  } catch (err) {
    throw new Error("Error fetching contacts: " + err.message);
  }
}

// Fetch a single contact by ID
async function getContactById(id) {
  try {
    const contact = await ContactModel.findById(id);
    if (!contact) {
      throw new Error("Contact not found");
    }
    return { success: true, data: contact };
  } catch (err) {
    throw new Error("Error fetching contact: " + err.message);
  }
}

// Save contact details
async function saveContactDetails(data) {
  try {
    const newContact = new ContactModel(data);
    await newContact.save();
    return { success: true, message: "Contact saved successfully!" };
  } catch (err) {
    throw new Error("Error saving contact details: " + err.message);
  }
}

// Update an existing contact
async function updateContact(id, data) {
  try {
    const updatedContact = await ContactModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!updatedContact) {
      throw new Error("Contact not found");
    }
    return { success: true, data: updatedContact };
  } catch (err) {
    throw new Error("Error updating contact: " + err.message);
  }
}

// Delete a contact
async function deleteContact(id) {
  try {
    const deletedContact = await ContactModel.findByIdAndDelete(id);
    if (!deletedContact) {
      throw new Error("Contact not found");
    }
    return { success: true, message: "Contact deleted successfully!" };
  } catch (err) {
    throw new Error("Error deleting contact: " + err.message);
  }
}

module.exports = {
  getAllContacts,
  getContactById,
  saveContactDetails,
  updateContact,
  deleteContact,
};
