 <template>
  <div class="new">
    <input class="new__input" v-model="newField" placeholder="Имя:Значение" />
    <button
      class="new__btn btn btnPrimary btn_contact"
      @click="addField(newField)"
    >
      <span class="new__txt"> Добавить поле</span>
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      contactId: "",
      contact: {},
      newField: "",
    };
  },
  mounted() {
    this.contactId = this.$route.params.id;
    if (this.contactId) {
      this.contact = this.$store.getters.getContact(this.contactId);
    } else {
      alert("Контакт не найден");
    }
     document.body.addEventListener("keyup", (e) => {
      if (e.keyCode === 13) this.addField(this.newField);
    });
  },
  methods: {
    /**
     * добавление нового поля
     */
    addField(value) {
      let newLabel = value.toString().split(":")[0];
      let newValue = value.toString().split(":")[1];
      this.$store.dispatch("addNewField", {
        contactId: this.contact.id,
        newLabel: newLabel,
        newValue: newValue,
      });
      this.newField = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.new {
  width: 100%;
  margin-top: 25px;
  display: flex;
  align-items: flex-start;
  &__input {
    width: 50%;
  }
  &__btn {
       margin-left: 25px;
  }
}

@media (max-width: 769px) {
  .new {
    flex-direction: column;
    align-items: center;
    &__input {
      width: 100%;
    }
  }
}
</style>