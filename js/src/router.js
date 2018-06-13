import Vue from "vue";
import Router from "vue-router";
import route from "./pages/route";

Vue.use(Router);

// VIEWS

const routes = [{ path: "*", component: route, meta: { title: "Sam Haakman" } }];

export default function createRouter() {
  return new Router({
    mode: "history",
    routes,
  });
}
