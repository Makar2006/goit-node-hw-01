const { log } = require('console');
const path = require('path');
const fs = require('fs').promises;
const contactsPath = path.join(__dirname, 'db', 'contacts.json');

async function listContacts() {
  return await fs
    .readFile(contactsPath)
    .then(data => JSON.parse(data))
    .catch(error => []);
}

async function getContactById(contactId) {
  return await listContacts().then(
    contacts => contacts.find(contact => contact.id === contactId) || null
  );
}

async function removeContact(contactId) {
  return await listContacts().then(contacts => {
    const updatedContacts = contacts.filter(
      contact => contact.id !== contactId
    );
    return fs
      .writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2))
      .then(() => contacts.find(contact => contact.id === contactId) || null);
  });
  //   const users = await listContacts();
  //   const id = contactId;
  //   const idx = users.findIndex(user => user.id === id);
  //   if (idx === -1) {
  //     console.log(`User with ID ${id} not found`);
  //     return false;
  //   }
  //   users.splice(idx, 1);
}

async function addContact(name, email, phone) {
  return await listContacts().then(contacts => {
    const newContact = { id: Date.now(), name, email, phone };
    const updatedContacts = [...contacts, newContact];
    return fs
      .writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2))
      .then(() => newContact);
  });
}

module.exports = { listContacts, getContactById, removeContact, addContact };
