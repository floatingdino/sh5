<template>
<section class="portfolio-content-block" :data-alt="index % 2 === 1">
  <picture>
    <source sizes="100vw" :srcset="data.image.mobile.url" media="(max-width:1024px)"/>
    <source sizes="(min-width:768px) 840px, 100vw" :srcset="data.image.url + ', ' +  data.image.retina.url + ' 2x'" />
    <img :src="data.image.url" sizes="(min-width:768px) 840px, 100vw" :srcset="data.image.url + ', ' + data.image.retina.url + ' 2x'" class="img-spinner" />
  </picture>
  <div class="portfolio-content-block-text">
    <div v-html="PrismicDOM.RichText.asHtml(data.body, null, pinkWrap)" />
  </div>
</section>
</template>
<script>
const PrismicDOM = require("prismic-dom");

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
    pinkWrap(element, content) {
      if (element.type === "paragraph") {
        return `<p><span class="pink-bg-text">${content}</span></p>`;
      }

      return null;
    }
  }
};
</script>
<style lang="scss">
.portfolio-content {
  &-block {
    position: relative;
    img {
      min-height: 750px;
    }
    &-text {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 50%;
      display: flex;
      padding: 10px;
      align-items: center;
      text-align: left;
    }
    &[data-alt="true"] {
      text-align: right;
      .portfolio-content-block-text {
        left: 0;
        right: 50%;
      }
    }
  }
}
</style>
