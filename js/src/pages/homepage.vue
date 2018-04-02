<template>
  <div class='wrapper'>
    <h1 v-if='page.data.title' class="home-title">{{PrismicDOM.RichText.asText(page.data.title)}}</h1>
    <main class="wrapper-content" v-html="PrismicDOM.RichText.asHtml(page.data.body)" />
    <blogSidebar title="Work" :api="api" />
  </div>
</template>
<script>
import blogSidebar from "components/blog-sidebar";

const PrismicDOM = require("prismic-dom");

export default {
  props: {
    page: Object,
    api: Object,
  },
  data() {
    return {
      loaded: false,
      title: "Sam Haakman", // Defaults until fetch can grab data
      sections: [],
      PrismicDOM,
    };
  },
  components: {
    blogSidebar,
  },
};
</script>
