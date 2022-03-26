import { Contacts } from "./dbConnectors";

export const resolvers = {
  Query: {
    getContacts: () => {
      return Contacts.find();
    },
    getOneContact: (root, { id }) => {
      return new Promise((resolve, object) => {
        Contacts.findById(id, (error, contact) => {
          if (error) {
            reject(error);
          } else {
            resolve(contact);
          }
        });
      });
    },
  },

  Mutation: {
    createContact: (root, { input }) => {
      const newContact = new Contacts({
        firstName: input.firstName,
        lastName: input.lastName,
        email: input.email,
        company: input.company,
      });
      newContact.id = newContact._id;
      return new Promise((resolve, object) => {
        newContact.save((error) => {
          if (error) {
            reject(error);
          } else {
            resolve(newContact);
          }
        });
      });
    },
    updateContact: (root, { input }) => {
      return new Promise((resolve, object) => {
        Contacts.findOneAndUpdate(
          { _id: input.id },
          input,
          { new: true },
          (error, contact) => {
            if (error) {
              reject(error);
            } else {
              resolve(contact);
            }
          }
        );
      });
    },
    deleteContact: (root, { id }) => {
      return new Promise((resolve, object) => {
        Contacts.remove({ id: id }, (error) => {
          if (error) {
            reject(error);
          } else {
            resolve("Successfully deleted contact");
          }
        });
      });
    },
  },
};
