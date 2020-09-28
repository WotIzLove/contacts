<template>
  <div class="contact">
    <router-link class="contact__link" :to="/contact/ + contact.id">
      <div></div>
      <div class="contact__info">
        <div class="contact__header">
          <i
            class="contact__item contact__item_icon fa fa-user"
            aria-hidden="true"
          ></i>
          <div>{{ contact.fields[0].value }}</div>
        </div>

        <div
          class="contact__item"
          v-for="field in contact.fields"
          :key="field.id"
        >
          <span class="contact__label">{{ field.label }}: </span
          ><span class="contact__value">{{ field.value }}</span>
        </div>
      </div>
    </router-link>
    <i
      class="contact__trash fa fa-trash"
      aria-hidden="true"
      @click="handleDeleteContact(contact)"
    ></i>
  </div>
</template>
<script>
export default {
  props: {
    contact: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      contactList: this.$store.getters.getContactList,
    };
  },
  methods: {
    async handleDeleteContact(contact) {
      if (
        await confirm(
          "Вы действительно хотите удалить этот контакт?",
          "Инфомация будет безвозвратно утеряна"
        )
      ) {
        this.deleteContact(contact);
      }
    },
    deleteContact(contact) {
      let index = this.contactList.indexOf(contact);
      this.$store.commit("deleteContact", index);
    },
  },
};
</script>

<style lang="scss" scoped>
.contact {
  background-color: #fff;
  display: flex;
  align-items: flex-start;
  width: 46%;
  padding: 18px 20px;
  margin-bottom: 20px;
  transition: all 0.25s cubic-bezier(0.02, 0.01, 0.47, 1);
  box-shadow: 0 30px 30px rgba(0, 0, 0, 0.02);
  &:hover {
    box-shadow: 0 30px 30px rgba(0, 0, 0, 0.04);
    transform: translateY(-6px);
    transition-delay: 0s !important;
  }
}
.contact__link {
  display: block;
  cursor: pointer;
  flex-grow: 1;
  color: #000;
}
.contact__info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}
.contact__item {
  padding: 2%;
  flex-basis: 100%;
  &_icon {
    flex-basis: auto;
  }
}
.contact__label {
  font-weight: 600;
}
.contact__header {
  display: flex;
  width: 100%;
  align-items: center;
  margin-bottom: 15px;
}
.contact__trash {
  padding: 2%;
  &:hover {
    cursor: pointer;
    color: #fc5c65;
  }
}

@media (max-width: 769px) {
  .contact {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .contact {
    &__header {
      margin-bottom: 5%;
    }
    &__label {
      display: block;
    }
    &__item {
      font-size: 16px;
    }
  }
}
</style>