<template>
	<transition name="v-loader" mode="out-in">
		<component v-if="!loading" :is="template" :page="page" />
		<img v-if="loading" src="/img/thick-spinner.svg" class="route-spinner" title="Loading..." alt="Loading, please wait">
	</transition>
</template>
<script>
import homePage from "./homepage";
import page from "./page";
import workPage from "./work";

import "whatwg-fetch";
export default {
  props: {
    cta: Object
  },
  watch: {
    $route(to, from) {
      this.updatePageData();
    }
  },
  components: {
    homePage: homePage,
    page: page,
    work: workPage
  },
  data: function() {
    return {
      template: "",
      loading: true,
      dataPath: () => {
        return `/js/data/${
          this.$route.path == "/" ? "homepage" : this.$route.path.slice(1)
        }.json`;
      },
      slug: this.$route.path.slice(1),
      page: {}
    };
  },
  methods: {
    updatePageData: function() {
      this.page = {};
      this.loading = true;
      // TODO: plug into Keystone so that this can be managed through an interface, not just uploading plain JSON
      fetch(this.dataPath()) //ES6 string interpolation
        .then(resp => resp.json())
        .then(data => {
          this.template = data.template;
          this.slug = data.slug;
          this.loading = false;
          Object.assign(this.page, data);
        })
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
    this.updatePageData();
  }
};
</script>
<style lang="scss">
@import "route";
</style>
