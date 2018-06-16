import Vue from "vue";
import Vuex from "vuex";
import { getType, getDataPath } from "./pages/routeHelpers";

const Prismic = require("prismic-javascript");
const apiEndpoint = "https://samhaakman.prismic.io/api/v2";

Vue.use(Vuex);

export default function createStore() {
  return new Vuex.Store({
    state: {
      pages: {},
    },
    actions: {
      fetchPage({ commit }, path) {
        const type = getType(path);
        const slug = getDataPath(path);
        return Prismic.getApi(apiEndpoint).then(api => {
          return api.getByUID(type, slug).then(response => {
            commit("setPage", { slug, data: response });
          });
        });
      },
    },
    mutations: {
      setPage(state, { slug, data }) {
        Vue.set(state.pages, slug, data);
      },
    },
  });
}
