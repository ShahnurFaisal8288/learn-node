const contact = require("../db/models/contact");

const contactUs = async (req, res, next) => {
  try {
    const body = req.body;

    //create a new  contact
    const newContact = await contact.create({
      name: body.name,
      phone: body.phone,
      complains: body.complains,
    });

    if (!newContact) {
      return res.status(400).json({
        status: "fail",
        message: "Failed to store contact data.",
      });
    }

    return res.status(201).json({
      status: "success",
      message: newContact,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({
      status: "fail",
      message: "An error occurred while creating the contact.",
    });
  }
};
//getContact
const contactGet = async (req, res, next) => {
  try {
    const contacts = await contact.findAll();
    if (contacts.length === 0) {
      return res.status(404).json({
        status: "fail",
        message: "No contacts found!",
      });
    }

    return res.status(200).json({
      status: "success",
      data: contacts,
    });
  } catch (error) {}
};
//updateContact
const contactUpdate = async (req, res, next) => {
  try {
    const contactId = req.params.id;
    const body = req.body;
    const existingContact = await contact.findByPk(contactId);

    if (!existingContact) {
      return res.status(404).json({
        status: "fail",
        message: "Contact not found for Updating",
      });
    }
    const updatedContact = await existingContact.update({
        name: body.name || existingContact.name,
        phone: body.phone || existingContact.phone,
        complains: body.complains || existingContact.complains,
    });
    return res.status(200).json({
      status: "success",
      data: updatedContact,
    });
  } catch (error) {
    return res.status(500).json({
        status: "fail",
        message: "An error occurred while Updating the contact.",
      });
  }
};

//DeleteContact
const contactDelete = async (req, res, next) => {
  try {
    const contactId = req.params.id;
    const existingContact = await contact.findByPk(contactId);

    if (!existingContact) {
      return res.status(404).json({
        status: "fail",
        message: "Contact not found for Deleting",
      });
    }
    await existingContact.destroy();
    return res.status(200).json({
      status: "success",
      message: "Contact Deleted Successfully",
    });
  } catch (error) {
    return res.status(500).json({
        status: "fail",
        message: "An error occurred while Deleting the contact.",
      });
  }
};
module.exports = { contactUs, contactGet, contactUpdate, contactDelete };
