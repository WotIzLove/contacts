<template>
  <section>
    <div class="header">
      <h1 class="title">Книга контактов</h1>
      <button class="btn btnPrimary" @click="modal = true">
        <i class="btn__icon fa fa-plus" aria-hidden="true"></i>
        <span class="btn__txt"> Добавить контакт</span>
      </button>
    </div>
    <div class="main">
      <div class="length">
        <h3 class="length__title_empty" v-if="!contactList.length">
          Контактов не найдено
        </h3>
        <h2 class="length__title" v-else>
          Найдено {{ contactList.length | declension }}
        </h2>
      </div>
      <hr />
      <div class="contacts">
        <ContactItem
          v-for="contact in contactList"
          :key="contact.id"
          :contact="contact"
        />
      </div>
    </div>
    <NewContact v-show="modal" @close="modal = false" />
  </section>
</template>

<script>
import ContactItem from "@/components/ContactItem";
import NewContact from "@/components/NewContact";

export default {
  components: {
    ContactItem,
    NewContact,
  },
  data() {
    return {
      contactList: null,
      modal: false,
    };
  },
  created() {
    this.contactList = this.$store.getters.getContactList;
  },
  filters: {
    /**
     * склонения
     */
    declension(count) {
      let value = Math.abs(count) % 100;
      let value1 = count % 10;
      if (count == 0) {
        return "Без пересадок";
      }
      if (value > 4 && value < 20) {
        return count + " контактов";
      }
      if (value1 > 1 && value1 < 5) {
        return count + " контакта";
      }
      if (value1 == 1) {
        return count + " контакт";
      }
      return count + " контакт";
    },
  },
};
</script>

<style lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 3%;
  align-items: center;
}

.length {
    padding: 2%;
}

.contacts {
    display: flex;
    margin-top: 2%;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: flex-start;
}

.btn__icon {
  font-size: 14px;
}

@media (max-width: 480px) {
  .header {
    padding: 3%;
  }
}
</style>
