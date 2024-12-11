// const ContactModel = require("../models/ContactModel");

// // Fetch all contacts
// async function getAllContacts() {
//   try {
//     const contacts = await ContactModel.find();
//     return { success: true, data: contacts };
//   } catch (err) {
//     throw new Error("Error fetching contacts: " + err.message);
//   }
// }

// // Fetch a single contact by ID
// async function getContactById(id) {
//   try {
//     const contact = await ContactModel.findById(id);
//     if (!contact) {
//       throw new Error("Contact not found");
//     }
//     return { success: true, data: contact };
//   } catch (err) {
//     throw new Error("Error fetching contact: " + err.message);
//   }
// }

// // Save contact details
// async function saveContactDetails(data) {
//   try {
//     const newContact = new ContactModel(data);
//     await newContact.save();
//     return { success: true, message: "Contact saved successfully!" };
//   } catch (err) {
//     throw new Error("Error saving contact details: " + err.message);
//   }
// }

// // Update an existing contact
// async function updateContact(id, data) {
//   try {
//     const updatedContact = await ContactModel.findByIdAndUpdate(id, data, {
//       new: true,
//     });
//     if (!updatedContact) {
//       throw new Error("Contact not found");
//     }
//     return { success: true, data: updatedContact };
//   } catch (err) {
//     throw new Error("Error updating contact: " + err.message);
//   }
// }

// // Delete a contact
// async function deleteContact(id) {
//   try {
//     const deletedContact = await ContactModel.findByIdAndDelete(id);
//     if (!deletedContact) {
//       throw new Error("Contact not found");
//     }
//     return { success: true, message: "Contact deleted successfully!" };
//   } catch (err) {
//     throw new Error("Error deleting contact: " + err.message);
//   }
// }

// module.exports = {
//   getAllContacts,
//   getContactById,
//   saveContactDetails,
//   updateContact,
//   deleteContact,
// };


const ContactPart1 = require("../models/ContactPart1");
const ContactPart2 = require("../models/ContactPart2");

// Save a new contact
const saveContact = async (data) => {
  const { id, name, email, phone, state, city, zipCode, message, subject, address } = data;

  const part1 = await ContactPart1.create({ id, name, email, phone, state });
  const part2 = await ContactPart2.create({ id, city, zipCode, message, subject, address });

  return { part1, part2 };
};

// Get contact by ID
const getContactById = async (id) => {
  const part1 = await ContactPart1.findOne({ id });
  const part2 = await ContactPart2.findOne({ id });

  if (!part1 || !part2) {
    throw new Error("Contact not found");
  }

  return { ...part1.toObject(), ...part2.toObject() };
};

// Get all contacts
const getAllContactss = async () => {
  const part1 = await ContactPart1.find();
  console.log(part1);
  const part2 = await ContactPart2.find();
  console.log(part2);
  // Merge contacts from both tables
  const contacts = part1.map((contact) => {
    const matchingPart2 = part2.find((p2) => p2.id === contact.id);
    return { ...contact.toObject(), ...matchingPart2.toObject() };
  });

  return contacts;
};

// Update a contact
const updateContactById = async (id, data) => {
  const { name, email, phone, state, city, zipCode, message, subject, address } = data;

  const part1 = await ContactPart1.findOneAndUpdate(
    { id },
    { name, email, phone, state },
    { new: true, runValidators: true }
  );

  const part2 = await ContactPart2.findOneAndUpdate(
    { id },
    { city, zipCode, message, subject, address },
    { new: true, runValidators: true }
  );

  if (!part1 || !part2) {
    throw new Error("Contact not found");
  }

  return { ...part1.toObject(), ...part2.toObject() };
};

// Delete a contact
const deleteContactById = async (id) => {
  const part1 = await ContactPart1.findOneAndDelete({ id });
  const part2 = await ContactPart2.findOneAndDelete({ id });

  if (!part1 || !part2) {
    throw new Error("Contact not found");
  }

  return { message: "Contact deleted successfully", id };
};

module.exports = {
  saveContact,
  getContactById,
  getAllContactss,
  updateContactById,
  deleteContactById,
};
