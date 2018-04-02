<template>
  <transition name="v-loader" mode="out-in">
    <component v-if="!loading" :is="template" :page="page" :api="api" />
    <img v-if="loading" src="/img/thick-spinner.svg" class="route-spinner" title="Loading..." alt="Loading, please wait">
  </transition>
</template>
<script>
// import homePage from "./homepage";
// import page from "./page";
// import workPage from "pages/work";

const homePage = () =>
  import(/* webpackChunkName: "homepage" */ "pages/homepage");
const page = () => import(/* webpackChunkName: "page" */ "pages/page");
const workPage = () => import(/*webpackChunkName: "portfolio" */ "pages/work");

const Prismic = require("prismic-javascript");
const PrismicDOM = require("prismic-dom");

const apiEndpoint = "https://samhaakman.prismic.io/api/v2";

export default {
  props: {
    cta: Object
  },
  watch: {
    $route() {
      this.updatePageData();
    }
  },
  components: {
    homepage: homePage,
    page,
    portfo: workPage
  },
  data() {
    return {
      template: "",
      loading: true,
      slug: this.$route.path.slice(1),
      page: {},
      api: null
    };
  },
  computed: {
    dataPath() {
      switch (this.$route.path) {
        case "/":
          return "home";
        default:
          return this.$route.path.match(/\/([^/]*)$/)[1]; // slug of final page in route
      }
    },
    type() {
      switch (this.$route.path.match(/^\/([^/]*)/)[1]) { // first part of the path
        case "":
          return "homepage";
        case "portfolio":
          return "portfo";
        default:
          return "page";
      }
    }
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
                  "Oh. a 404. You know what this means, right?<br>You've gone somewhere you shouldn't have. I've had a few revisions on this site, so maybe you followed an old link here."
              },
              {
                content:
                  "Anyway, there's nothing here. You should go back to the homepage."
              }
            ]
          });
        });
    }
  },
  created() {
    Prismic.getApi(apiEndpoint)
      .then(api => {
        this.api = api;
      })
      .then(() => {
        this.updatePageData();
      });
  }
};
</script>
<style lang="scss">
@import "route";
</style>
