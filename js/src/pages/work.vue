<template>
  <div>
    <div class="header-wrapper">
      <h2><router-link to="/">Sam Haakman</router-link></h2>
    </div>
    <div class="internal-page-wrapper">
      <div class='wrapper work-wrapper'>
        <h1 v-if='page.data.title'>{{PrismicDOM.RichText.asText(page.data.title)}}</h1>
        <main class='wrapper-content'>
          <router-link role='button' class='btn btn-pink' to='/'>Go home</router-link>
        </main>
      </div>
    </div>
  </div>
</template>
<script>
const PrismicDOM = require("prismic-dom");

export default {
  props: {
    page: Object
  },
  data: function() {
    return {
      PrismicDOM
    };
  },
  created: function() {
    console.log(this);
  },
  methods: {
    slideSrcset: function(img) {
      let srcset = [];
      srcset.push(img.src + img.fileType + " " + img.baseSize + "w");

      img.srcset.forEach(function(size) {
        srcset.push(
          img.src +
            "@" +
            size +
            img.fileType +
            " " +
            Math.round(img.baseSize * size) +
            "w"
        );
      });
      return srcset;
    }
  }
};
</script>
<style lang="scss">
@import "work";
</style>
