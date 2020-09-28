<template>
  <section class="section">
    <div class="top">
      <h1 class="title title_main">Страница контакта</h1>
    </div>
    <div class="contact">
      <div class="header">
        <div class="header__name">
          <i class="header__user fa fa-user" aria-hidden="true"></i>
          <span class="header__title title"> {{ contact.id }}</span>
        </div>
        <div class="options">
          <button
            class="options__button options__button_undo"
            :disabled="!(this.historyIndex > 0)"
            @click="undo"
          >
            <i class="fa fa-undo" aria-hidden="true"></i>
          </button>
          <button
            class="options__button options__button_redo"
            :disabled="!(this.historyIndex < this.contactHistory.length - 1)"
            @click="redo"
          >
            <i class="fa fa-undo"></i>
          </button>
        </div>
      </div>
      <div class="fields">
        <Field v-for="field in contact.fields" :key="field.id" :field="field" />
      </div>
      <hr />
      <NewField />

      <div class="back">
        <router-link class="back__link" :to="'/'">
          <span class="back__txt">Назад</span>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
import Edit from "../components/Edit";
import Field from "../components/Field";
import NewField from "../components/NewField";

export default {
  components: {
    Edit,
    Field,
    NewField,
  },
  data() {
    return {
      contactId: "",
      contact: {},
      contactHistory: [],
      historyIndex: 0,
      watching: true,
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
    /**
     * шаг назад
     */
    undo() {
      this.watching = false;
      if (this.historyIndex > 0) {
        this.historyIndex -= 1;
        this.contact = this.contactHistory[this.historyIndex];
      }
    },
    /**
     * шаг вперёд
     */
    redo() {
      this.watching = false;
      if (this.historyIndex < this.contactHistory.length - 1) {
        this.historyIndex += 1;
        this.contact = this.contactHistory[this.historyIndex];
      }
    },
  },
  watch: {
    /**
     *  сохранение истрии изменения контактной информации
     */
    contact: {
      handler: function (val) {
        if (this.watching) {
          this.contactHistory.push(JSON.parse(JSON.stringify(val)));
          this.historyIndex = this.contactHistory.length - 1;
        } else {
          this.watching = true;
        }
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.top {
  margin-bottom: 3%;
}

.contact {
  width: 980px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 30px;
  background: #fff;
}


.header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  &__user {
    font-size: 30px;
  }
}

.options {
  margin-left: auto;
  &__button {
    cursor: pointer;
    border: none;
    background: none;
    &_redo {
      transform: scale(-1, 1);
    }
  }
}

.back {
  align-self: flex-end;
  margin-top: 50px;
}

.fields {
  width: 100%;
  margin-top: 3%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}


@media (max-width: 769px) {
  .contact {
    width: 100%;
    padding: 5%;
  }
}

@media (max-width: 480px) {
  .wrapper-content.wrapper-content--fixed {
    margin-top: 30px;
  }

  .header {
    &__user {
      font-size: 25px;
    }
  }
}
</style>