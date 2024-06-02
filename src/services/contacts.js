import {
  ContactsCollection,
  ContactCollection,
} from '../db/models/contacts.js';
// import {  } from '../db/models/contact.js';

export const getAllContacts = async () => {
  const contacts = await ContactsCollection.find();
  return contacts;
};

export const getContactById = async (contactId) => {
  const contact = await ContactsCollection.findById(contactId);
  return contact;
};

export const createContact = async (payload) => {
  const contact = await ContactCollection.create(payload);
  return contact;
};
