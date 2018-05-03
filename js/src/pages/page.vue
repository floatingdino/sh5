<template>
  <div class='wrapper narrow-wrapper'>
    <h1 v-if='page.data.title'>{{page.data.title}}</h1>
    <main class='wrapper-content'>
      <div v-html="PrismicDOM.RichText.asHTML(page.data.body)" />
      <router-link class='btn' to='/'>Take me home</router-link>
    </main>
  </div>
</template>
<script>
// import contentBlock from "components/content-block";

const PrismicDOM = require("prismic-dom");

export default {
  props: {
    cta: Object,
    page: Object,
    api: Object
  },
  data() {
    return {
      PrismicDOM
    };
  }
};
</script>
<style lang="scss">
@import "page";
</style>
