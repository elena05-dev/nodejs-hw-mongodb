import { Contact } from '../db/models/contact.js';

export const getAllContacts = async () => {
  const contacts = await Contact.find();
  return contacts;
};

export const getContactById = async (contactId) => {
  const contact = await Contact.findById(contactId);
  return contact;
};

export const createContact = async (payload) => {
  const contact = await Contact.create(payload);
  return contact;
};

export const patchContact = async (contactId, updateData) => {
  const contact = await Contact.findByIdAndUpdate(contactId, updateData, {
    new: true,
    runValidators: true,
  });

  return contact;
};

export const deleteContact = async (id) => {
  return Contact.findByIdAndDelete(id);
};
