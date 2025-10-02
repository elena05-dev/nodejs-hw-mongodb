import { Contact } from '../db/models/contact.js';
import { SORT_ORDER } from '../constants/index.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
  userId,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const query = { ...filter, userId };

  const contactsQuery = Contact.find(query);
  const contactsCount = await Contact.countDocuments(query);

  const contacts = await contactsQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();

  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContactById = async (contactId, userId) => {
  const contact = await Contact.findOne({ _id: contactId, userId });
  return contact;
};

export const createContact = async (payload, userId) => {
  const contact = await Contact.create({ ...payload, userId });
  return contact;
};

export const patchContact = async (contactId, updateData, userId) => {
  const contact = await Contact.findOneAndUpdate(
    { _id: contactId, userId },
    updateData,
    {
      new: true,
      runValidators: true,
    },
  );

  return contact;
};

export const deleteContact = async (id, userId) => {
  return Contact.findOneAndDelete({ _id: id, userId });
};
