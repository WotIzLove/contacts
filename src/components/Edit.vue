<template>
  <transition name="modal">
    <div class="modal__wrapper" @click="handleCancelEdit">
      <div class="modal__content" @click.stop="">
        <div class="modal__header">
          <span class="modal__title"> </span>
          <span class="button-close" @click="handleCancelEdit">×</span>
        </div>
        <div class="modal__body">
          <div class="modal__label">Имя поля</div>
          <input class="modal__input" v-model.trim="field.label" />
          <div class="modal__label">Значение поля</div>
          <input class="modal__input" v-model.trim="field.value" />
          <button @click="$emit('close')" class="modal__button btn btnPrimary">
            Изменить
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import VueLodash from "vue-lodash";
import lodash from "lodash";

export default {
  props: {
    field: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      startLabel: null,
      startValue: null,
      formFieldsModified: false,
      formFieldsInitialState: {},
    };
  },
  created() {
    this.setFormFieldsInitialState();
  },
  mounted() {
    document.body.addEventListener("keyup", (e) => {
      if (e.keyCode === 27) this.$emit("close");
    });
  },
  methods: {
    async handleCancelEdit() {
      if (
        await confirm(
          "Вы действительно хотите закрыть редактирование?",
          "Все несохранённые изменения будут утеряны."
        )
      ) {
        this.cancelEdit();
      }
    },
    cancelEdit() {
      this.$emit("close");
      this.resetContact();
    },
    setFormFieldsInitialState() {
      this.formFieldsInitialState = _.cloneDeep(this.field);
      this.formFieldsModified = false;
    },
    resetContact() {
      this.field.label = this.formFieldsInitialState.label;
      this.field.value = this.formFieldsInitialState.value;
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-enter .modal-leave-active {
  opacity: 0;
}

.modal-enter .modal__content,
.modal-leave-active .modal__content {
  transform: scale(1.2);
}

.modal {
  &__wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    transition: opacity 0.2s ease;
    right: 0;
    z-index: 998;
    background-color: rgba(00, 00, 00, 0.48);
  }
  &__content {
    position: relative;
    max-width: 600px;
    padding: 20px 18px;
    background-color: #fff;
    border: 1px solid #dcdfe6;
    transition: all 0.2s ease;
    border-radius: 8px;
    z-index: 999;
    overflow: hidden;
    @media screen and (min-width: 900px) {
      min-width: 500px;
    }
  }
  &__header {
    display: flex;
    align-self: center;
    justify-content: space-between;
    padding-bottom: 20px;
    span {
      font-size: 24px;
    }
    .button-close {
      cursor: pointer;
    }
  }
  &__body {
    text-align: center;
  }
}
</style>
