const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');
const argv = yargs(hideBin(process.argv)).argv;

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require('./contacts');

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case 'list':
      const contactsList = await listContacts();
      console.table(contactsList);
      break;

    case 'get':
      const getContact = await getContactById(id);
      console.table(getContact);
      break;

    case 'add':
      const newContact = await addContact({ name, email, phone });
      console.table(newContact);
      break;

    case 'remove':
      const deleteContact = await removeContact(id);
      console.table(deleteContact);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
};

invokeAction(argv);
