<template>
  <div class='wrapper narrow-wrapper'>
    <h1 v-if='page.data.page_title'>{{page.data.page_title[0].text}}</h1>
    <main class='wrapper-content'>
      <div v-html="PrismicDOM.RichText.asHtml(page.data.body)" />
      <router-link class='btn' to='/'>Take me home</router-link>
    </main>
  </div>
</template>
<script>
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
