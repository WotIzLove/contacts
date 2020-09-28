<template>
  <div class="field">
    <div class="field__values">
      <span class="field__label">{{ field.label }}: </span
      ><span class="field__value">{{ field.value }}</span>
    </div>
    <div class="field__icons">
      <i
        class="field__icon contact__icon_edit fa fa-pencil"
        aria-hidden="true"
        @click="handleEditField(field.id)"
      ></i>
      <i
        class="field__icon field__icon_del fa fa-trash"
        aria-hidden="true"
        @click="handleDeleteField(field.id)"
      ></i>
    </div>

    <Edit v-if="modal" @close="modal = false" :field="fieldActive"></Edit>
  </div>
</template>



<script>
import Edit from "../components/Edit";
export default {
  components: {
    Edit,
  },
  props: {
    field: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      contact: null,
      contactId: null,
      modal: false,
      fieldActive: {},
    };
  },
  mounted() {
    this.contactId = this.$route.params.id;
    if (this.contactId) {
      this.contact = this.$store.getters.getContact(this.contactId);
    } else {
      alert("Контакт не найден");
    }
  },
  methods: {
    getField(id) {
      let fields = this.contact.fields;
      let index = fields.findIndex((field) => field.id === id);
      return fields[index];
    },
    /**
     * обработка изменения контакта
     */
    handleEditField(fieldId) {
      this.modal = true;
      this.fieldActive = this.getField(fieldId);
    },
     /**
   * вызов удаления записи с подтвержденеим
   */
    async handleDeleteField(fieldId) {
      if (await confirm("Вы действительно хотите удалить это поле?")) {
        this.$store.commit("removeField", {
          contactId: this.contact.id,
          fieldId: fieldId,
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.field {
  display: flex;
  padding: 10px;
  padding-left: 0;
  width: 50%;
  &__label {
    font-weight: 600;
  }
  &__icons {
    display: flex;
    margin-left: 20px;
  }
  &__icon {
    color: rgb(170, 170, 170);
    cursor: pointer;
    padding: 5px;
    transition: all 0.2s ease;
    &:hover {
      color: #000;
    }
    &_del {
      &:hover {
        color: #fc5c65;
      }
    }
  }
}

@media (max-width: 769px) {
  .field {
    width: 100%;
    font-size: 16px;
  }
}

@media (max-width: 480px) {
  .field {
    justify-content: space-between;
    &__label {
      display: block;
    }
  }
}
</style>