import { ContactsCollection } from '../db/models/contacts.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
  user = null,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = ContactsCollection.find({ userId: user._id });

  if (filter.type) {
    contactsQuery.where('contactType').equals(filter.type);
  }
  if (filter.favourite === true) {
    contactsQuery.where('isFavourite').equals(filter.favourite);
  }
  if (filter.favourite === false) {
    contactsQuery.where('isFavourite').equals(filter.favourite);
  }

  const contactsCount = await ContactsCollection.find({ userId: user.Id })
    .merge(contactsQuery)
    .countDocuments();

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
  const contact = await ContactsCollection.findById(contactId).where({
    userId: userId,
  });
  return contact;
};

export const createContact = async (payload) => {
  const contact = await ContactsCollection.create(payload);
  return contact;
};

export const updateContact = async (
  { contactId, userId },
  payload,
  options = {},
) => {
  const rawResult = await ContactsCollection.findOneAndUpdate(
    { _id: contactId, userId: userId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    contact: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};

export const deleteContact = async (contactId, userId) => {
  const contact = await ContactsCollection.findOneAndDelete({
    _id: contactId,
  }).where({ userId: userId });

  return contact;
};
