<template>
<section class="portfolio-content-block" :data-alt="index % 2 === 1">
  <picture>
    <source sizes="100vw" :srcset="data.image.mobile.url" media="(max-width:1024px)"/>
    <source sizes="(min-width:768px) 840px, 100vw"
    :srcset="data.image.url + ', '
    /* +  data.image.retina.url + ' 2x' */
    "
    />
    <img :src="data.image.url" sizes="(min-width:768px) 840px, 100vw"
    :srcset="data.image.url
    /* + ', ' + data.image.retina.url + ' 2x' */
    "
    class="img-spinner" />
  </picture>
  <div class="portfolio-content-block-text">
    <div v-html="PrismicDOM.RichText.asHtml(data.body, null, pinkWrap)" />
  </div>
</section>
</template>
<script>
const PrismicDOM = require("prismic-dom");
const Elements = PrismicDOM.RichText.Elements;

export default {
  props: {
    data: Object,
    index: Number
  },
  data() {
    return {
      PrismicDOM
    };
  },
  methods: {
    pinkWrap(type, element, content, children) {
      if (type === Elements.paragraph) {
        return `<p><span class="pink-bg-text">${children.join('')}</span></p>`;
      }

      return null;
    }
  }
};
</script>
<style lang="scss">
@import "work-content-block";
</style>
