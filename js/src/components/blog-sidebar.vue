<template>
  <aside class='blog-sidebar'>
    <h2 v-if='title'>{{title}}</h2>
    <blog-preview v-for='(blog, index) in response.results.slice(0, numberPreviews)' :key='index' :data='blog'/>
    <span v-if='response.results.length > 2'>
    <h2>Other cool sites I've built</h2>
    <ul class='inline'>
      <li v-for='(blog, index) in response.results.slice(2)' :key='index'>
        <a :href='blog.url' target='_blank' rel='nofollow noopener'>{{blog.title}}</a>
      </li>
    </ul>
    </span>
    <p><router-link to='/privacy'>Read my super-exciting privacy policy</router-link></p>
  </aside>
</template>
<script>
import blogPreview from "./blog-preview";

const Prismic = require("prismic-javascript");

const apiEndpoint = "https://samhaakman.prismic.io/api/v2";

export default {
  props: {
    title: String,
    numberPreviews: {
      type: Number,
      default: 2
    },
    api: Object
  },
  data: function() {
    return {
      // Defaults to empty and then fetches data in created
      loaded: false,
      response: {
        results: []
      }
    };
  },
  created: function() {
    this.api
      .query(Prismic.Predicates.at("document.type", "portfo"), {
        orderings: "[my.portfo.date desc]"
      })
      .then(
        function(response) {
          Object.assign(this.response, response);
          this.loaded = true;
        }.bind(this)
      );
  },
  components: {
    blogPreview: blogPreview
  }
};
</script>
<style lang="scss">
@import "blog-sidebar";
</style>
