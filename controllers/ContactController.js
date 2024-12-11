// const ContactService = require("../services/ContactService");

// // Get all contacts (GET)
// const getAllContacts = async (req, res) => {
//   try {
//     const result = await ContactService.getAllContacts();
//     res.status(200).json(result); // Send all contacts
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // Get a single contact by ID (GET)
// const getContactById = async (req, res) => {
//     const { id } = req.params;
  
//     // Validate ID format
//     if (!id.match(/^[0-9a-fA-F]{24}$/)) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid ID format",
//       });
//     }
  
//     try {
//       const contact = await ContactService.getContactById(id);
//       if (!contact) {
//         return res.status(404).json({
//           success: false,
//           message: "Contact not found",
//         });
//       }
  
//       res.status(200).json({
//         success: true,
//         data: contact,
//       });
//     } catch (err) {
//       res.status(500).json({
//         success: false,
//         message: err.message,
//       });
//     }
//   };
  

// // Save contact details (POST)
// const saveContactDetails = async (req, res) => {
//   try {
//     const result = await ContactService.saveContactDetails(req.body);
//     res.status(201).json(result); // Send success response
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // Update an existing contact (PUT)
// const updateContact = async (req, res) => {
//   try {
//     const { id } = req.params;
  
//     // Validate ID format
//     if (!id.match(/^[0-9a-fA-F]{24}$/)) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid ID format",
//       });
//     }
//     const result = await ContactService.updateContact(id, req.body);
//     res.status(200).json(result); // Send success response
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // Delete a contact (DELETE)
// const deleteContact = async (req, res) => {
//   try {
//     const result = await ContactService.deleteContact(req.params.id);
//     res.status(200).json(result); // Send success response
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// module.exports = {
//   getAllContacts,
//   getContactById,
//   saveContactDetails,
//   updateContact,
//   deleteContact,
// };

const {
  saveContact,
  getContactById,
  getAllContactss,
  updateContactById,
  deleteContactById,
} = require("../services/ContactService");

// Create a new contact
const createContact = async (req, res) => {
  try {
    const data = req.body;
    const result = await saveContact(data);
    res.status(201).json({ message: "Contact saved successfully", result });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a contact by ID
const getContact = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await getContactById(id);
    res.status(200).json({ message: "Contact retrieved successfully", result });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Get all contacts
const getAllContacts = async (req, res) => {
  try {
    // Fetch all contacts from the database
    const contacts = await getAllContactss(); // Ensure this function interacts with your DB correctly.

    // Validate that contacts were found
    if (!contacts || contacts.length === 0) {
      return res.status(404).json({ message: "No contacts found" });
    }

    // Filter based on the provided ID if necessary
    const { id } = req.query; // Example: GET /api/contacts?id=<specific-id>
    if (id) {
      const contact = contacts.find((contact) => contact.id === id || contact._id?.toString() === id);
      if (!contact) {
        return res.status(404).json({ message: `No contact found with ID: ${id}` });
      }
      return res.status(200).json({ message: "Contact retrieved successfully", result: contact });
    }

    // Return all contacts if no ID was provided
    res.status(200).json({ message: "Contacts retrieved successfully", result: contacts });
  } catch (error) {
    console.error("Error retrieving contacts:", error);
    res.status(500).json({ message: "Failed to retrieve contacts", error: error.message });
  }
};

// Update a contact by ID
const updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const result = await updateContactById(id, data);
    res.status(200).json({ message: "Contact updated successfully", result });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a contact by ID
const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteContactById(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  createContact,
  getContact,
  getAllContacts,
  updateContact,
  deleteContact,
};
