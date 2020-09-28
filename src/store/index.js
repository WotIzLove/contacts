import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import contacts from "./modules/contacts";

export default new Vuex.Store({
  modules: {
    contacts,
  },
});
