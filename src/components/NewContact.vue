<template>
  <transition name="modal">
    <div class="modal__wrapper" @click="$emit('close')">
      <div class="modal__content" @click.stop="">
        <!-- header -->
        <div class="modal__header">
          <span class="modal__title"> </span>
          <span class="button-close" @click="$emit('close')">×</span>
        </div>

        <!-- body -->
        <div class="modal__body">
            <div class="modal__label">Имя</div>
            <input class="modal__input" v-model="name" />
            <div class="modal__label">Телефон</div>
            <input class="modal__input" v-model="phone" />
            <div class="modal__label">Email</div>
            <input class="modal__input" v-model="email" />
            <button class="modal__button btn btnPrimary" @click="addNewContact">
              Добавить
            </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      phone: "",
      email: "",
    };
  },
  mounted() {
    document.body.addEventListener("keyup", (e) => {
      if (e.keyCode === 27) this.$emit("close");
    });
  },
  computed: {
    contactList() {
      return (this.contactList = this.$store.getters.getContactList);
    },
  },
  /**
   * добавление нового контакта
   */
  methods: {
    addNewContact() {
      this.$store.dispatch("addNewContact", {
        name: this.name,
        phone: this.phone,
        email: this.email,
      });
      this.$emit("close");
      this.name = "";
      this.phone = "";
      this.email = "";
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
