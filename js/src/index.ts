import Vue from "vue";
import VueRouter from "vue-router";
// import { createRenderer as VSR } from "vue-server-renderer";

import App from "./App";
import route from "./pages/route";

Vue.use(VueRouter);

// VIEWS

const routes = [
  { path: "*", component: route, meta: { title: "Sam Haakman" } }
];

const router = new VueRouter({
  mode: "history",
  routes: routes
});
router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  window.scrollTo(0, 0);
  next();
});
const app = new Vue({
  el: "#app",
  router,
  render: h => h(App)
});
