// default
import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

// Views
import Home from "@/views/Home";
import Contact from "@/views/Contact";

// Routering
export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/contact/:id",
      name: "contact",
      component: Contact,
    }
  ],
});
