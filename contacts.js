const { log } = require('console');
const path = require('path');
const fs = require('fs').promises;
const contactsPath = path.join(__dirname, 'db', 'contacts.json');

function listContacts() {
  return fs
    .readFile(contactsPath)
    .then(data => JSON.parse(data))
    .catch(error => []);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contact = contacts.find(({ id }) => id === contactId);
  if (!contact) {
    return null;
  }
  return contact;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const deletedContacts = contacts.filter(({ id }) => id !== contactId);
  try {
    await fs.writeFile(contactsPath, JSON.stringify(deletedContacts));
    console.log(`Contact with id=${contactId} was removed`);
  } catch (err) {
    console.log(err.message);
  }
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = {
    id: Date.now(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

module.exports = { listContacts, getContactById, removeContact, addContact };
