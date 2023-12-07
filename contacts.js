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

function getContactById(contactId) {
  return listContacts().then(
    contacts => contacts.find(contact => contact.id === contactId) || null
  );
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const newContacts = contacts.filter(({ id }) => id !== contactId);
  try {
    await fs.writeFile(contactsPath, JSON.stringify(newContacts));
    console.log(`Contact with id=${contactId} was removed`);
  } catch (err) {
    console.log(err.message);
  }
}

function addContact(name, email, phone) {
  return listContacts().then(contacts => {
    const newContact = { id: Date.now(), name, email, phone };
    const updatedContacts = [...contacts, newContact];
    return fs
      .writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2))
      .then(() => newContact);
  });
}

module.exports = { listContacts, getContactById, removeContact, addContact };
