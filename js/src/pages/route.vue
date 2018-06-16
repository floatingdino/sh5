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
      this.updatePageData();
    },
  },
  components: {
    homepage: homePage,
    // page,
    portfo: workPage,
  },
  data() {
    return {
      // template: "",
      loading: true,
      slug: this.$route.path.slice(1),
      // page: {},
      api: null,
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
  },
  asyncData({ store, route }) {
    return store.dispatch("fetchPage", { path: route.path });
  },
  methods: {
    updatePageData() {
      this.page = {};
      this.loading = true;
      this.api
        .getByUID(this.type, this.dataPath)
        .then(response => {
          Object.assign(this.page, response);
          this.template = response.type;
          this.slug = this.$route.path;
          this.loading = false;
        })
        .catch(error => {
          console.warn("Something went wrong with navigation", error, this);
          this.loading = false;
          this.slug = this.$route.path;
          this.template = page;
          Object.assign(this.page, {
            title: 404,
            template: "page",
            sections: [
              {
                content:
                  "Oh. a 404. You know what this means, right?<br>You've gone somewhere you shouldn't have. I've had a few revisions on this site, so maybe you followed an old link here.",
              },
              {
                content: "Anyway, there's nothing here. You should go back to the homepage.",
              },
            ],
          });
        });
    },
  },
  created() {
    console.log(this.dataPath);
    this.$store.dispatch("fetchPage", this.$route.path).then(() => {
      this.loading = false;
      console.log(this.page);
    });
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
