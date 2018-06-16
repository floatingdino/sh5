<template>
  <transition name="v-loader" mode="out-in">
    <component v-if="!loading" :is="template" :page="page" :api="api" />
    <img v-if="loading" src="/img/thick-spinner.svg" class="route-spinner" title="Loading..." alt="Loading, please wait">
  </transition>
</template>
<script>
import { getType, getDataPath } from "./routeHelpers";
const homePage = () => import(/* webpackChunkName: "homepage" */ "pages/homepage");
const page = () => import(/* webpackChunkName: "page" */ "pages/page");
const workPage = () => import(/*webpackChunkName: "portfolio" */ "pages/work");

const Prismic = require("prismic-javascript");
const PrismicDOM = require("prismic-dom"); // TODO: Investigate removing this dependency

const apiEndpoint = "https://samhaakman.prismic.io/api/v2";

export default {
  props: {
    cta: Object,
  },
  watch: {
    $route() {
      // this.updatePageData();
    },
  },
  components: {
    homepage: homePage,
    page,
    portfo: workPage,
  },
  data() {
    return {
      slug: this.$route.path.slice(1),
      api: null,
      routeLoading: true,
      // loading: false || !this.page,
    };
  },
  computed: {
    dataPath() {
      return getDataPath(this.$route.path);
    },
    type() {
      return getType(this.$route.path);
    },
    page() {
      return this.$store.state.pages[getDataPath(this.$route.path)];
    },
    template() {
      return this.$store.state.pages[getDataPath(this.$route.path)].type;
    },
    loading() {
      console.log(!this.routeLoading, !this.page, this.$route);
      return !this.page && !this.routeLoading; // FIXME
    },
  },
  asyncData({ store, route }) {
    return store.dispatch("fetchPage", route.path);
  },
  created() {
    // console.log(this.dataPath);
    // this.$store.dispatch("fetchPage", this.$route.path).then(() => {
    //   this.loading = false;
    //   console.log(this.page);
    // });
    // Prismic.getApi(apiEndpoint)
    //   .then(api => {
    //     this.api = api;
    //   })
    //   .then(() => {
    //     this.updatePageData();
    //   });
  },
};
</script>
<style lang="scss">
@import "route";
</style>
