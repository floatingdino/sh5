<template>
  <aside class='blog-sidebar'>
    <h2 v-if='title'>{{title}}</h2>
    <blog-preview v-for='(blog, index) in response.results.slice(0, numberPreviews)' :key='index' :data='blog'/>
    <span v-if='response.results.length > 2'>
    <h2>Other cool sites I've built</h2>
    <ul class='inline'>
      <li v-for='(blog, index) in response.results.slice(2)' :key='index'>
        <router-link :to='`portfolio/${blog.uid}`'>{{PrismicDOM.RichText.asText(blog.data.title)}}</router-link>
      </li>
    </ul>
    </span>
    <p><router-link to='/privacy'>Read my super-exciting privacy policy</router-link></p>
  </aside>
</template>
<script>
import blogPreview from "./blog-preview";

const Prismic = require("prismic-javascript");
const PrismicDOM = require("prismic-dom");
export default {
  props: {
    title: String,
    numberPreviews: {
      type: Number,
      default: 2,
    },
    api: Object,
  },
  data() {
    return {
      // Defaults to empty and then fetches data in created
      loaded: false,
      response: {
        results: [],
      },
      PrismicDOM,
    };
  },
  created() {
    this.api
      .query(Prismic.Predicates.at("document.type", "portfo"), {
        orderings: "[my.portfo.project_date desc]",
      })
      .then(response => {
        Object.assign(this.response, response);
        this.loaded = true;
      });
  },
  components: {
    blogPreview,
  },
};
</script>
<style lang="scss">
@import "blog-sidebar";
</style>
