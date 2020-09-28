export default {
  state: {
    contactList: [
      {
        id: 1,
        fields: [
          {
            id: 1,
            label: "Имя",
            value: "Гринев Арсений",
          },
          {
            id: 2,
            label: "Телефон",
            value: "7(68)215-10-81",
          },
          {
            id: 3,
            label: "Email",
            value: "fdddda546o@kocoks.com",
          },
        ],
      },
      {
        id: 2,
        fields: [
          {
            id: 1,
            label: "Имя",
            value: "Мартынский Августин",
          },
          {
            id: 2,
            label: "Телефон",
            value: "7(88)221-96-53",
          },
          {
            id: 3,
            label: "Email",
            value: "pali@lanorthface.com",
          },
        ],
      },
      {
        id: 3,
        fields: [
          {
            id: 1,
            label: "Имя",
            value: "Лесков Андрей",
          },
          {
            id: 2,
            label: "Телефон",
            value: "7(428)219-07-72",
          },
          {
            id: 3,
            label: "Email",
            value: "aelwoodb@limez.wtf",
          },
        ],
      },
      {
        id: 4,
        fields: [
          {
            id: 1,
            label: "Имя",
            value: "Венюков Руслан",
          },
          {
            id: 2,
            label: "Телефон",
            value: "7(988)443-42-23",
          },
          {
            id: 3,
            label: "Email",
            value: "5imad.souf.5@limez.wtf",
          },
        ],
      },
    ],
  },
  mutations: {
    setContact(state, contactList) {
      state.contactList = contactList;
    },
    addContact(state, newContact) {
      state.contactList.push(newContact);
    },
    deleteContact(state, index) {
      state.contactList.splice(index, 1);
    },
    addField(state, data) {
      let contact = state.contactList.find((item) => item.id == data.contactId);
      let fields = contact.fields;
      fields.push(data.newField);
    },
    removeField(state, data) {
      let contact = state.contactList.find((item) => item.id == data.contactId);
      let fields = contact.fields;
      let index = fields.findIndex((item) => item.id === data.fieldId);
      fields.splice(index, 1);
    },
  },
  actions: {
    addNewContact(ctx, data) {
      let random = () =>
        Date.now().toString(36) +
        Math.random()
          .toString(36)
          .substr(2);

      let newContact = {
        id: random(),
        fields: [
          {
            id: 1,
            label: "Имя",
            value: data.name,
          },
          {
            id: 2,
            label: "Телефон",
            value: data.phone,
          },
          {
            id: 3,
            label: "Email",
            value: data.email,
          },
        ],
      };
      ctx.commit("addContact",  newContact);
    },
    addNewField(ctx, data) {
      let random = () =>
        Date.now().toString(36) +
        Math.random()
          .toString(36)
          .substr(2);
      let newField = {
        id: random(),
        label: data.newLabel,
        value: data.newValue,
      };

      ctx.commit("addField", {contactId: data.contactId, newField: newField});
    },

  },
  getters: {
    getContactList(state) {
      return state.contactList;
    },
    getContact: (state) => (id) => {
      return state.contactList.find((contact) => contact.id == id);
    },
  },
};
