<template>
  <transition name="v-loader" mode="out-in">
    <component v-if="!loading" :is="template" :page="page" :api="api" />
    <img v-if="loading" src="/img/thick-spinner.svg" class="route-spinner" title="Loading..." alt="Loading, please wait">
  </transition>
</template>
<script>
import homePage from "./homepage";
import page from "./page";
import workPage from "./work";

import "whatwg-fetch";

const Prismic = require("prismic-javascript");

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
    page: page,
    portfo: workPage
  },
  data: function() {
    return {
      template: "",
      loading: true,
      slug: this.$route.path.slice(1),
      page: {},
      api: null
    };
  },
  computed: {
    dataPath: function() {
      console.log(this.$route.path.match(/\/([^\/]*)$/));
      switch (this.$route.path) {
        case "/":
          return "home";
          break;
        default:
          return this.$route.path.match(/\/([^\/]*)$/)[1];
      }
    },
    type: function() {
      switch (this.$route.path.match(/^\/([^\/]*)/)[1]) {
        case "":
          return "homepage";
          break;
        case "portfolio":
          return "portfo";
          break;
        default:
          return "page";
      }
    }
  },
  methods: {
    updatePageData: function() {
      this.page = {};
      this.loading = true;
      console.log(this.type, this.dataPath);
      this.api
        .getByUID(this.type, this.dataPath)
        .then(
          function(response) {
            Object.assign(this.page, response);
            this.template = response.type;
            this.slug = this.$route.path;
            this.loading = false;
          }.bind(this)
        )
        .catch(
          function(error) {
            console.warn("Something went wrong with navigation", this);
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
          }.bind(this)
        );
    }
  },
  created: function() {
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
