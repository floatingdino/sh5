<template>
<section class="portfolio-big-image">
  <picture>
    <source :srcset="data.image.mobile.url" media="(max-width:414px)">
    <img :src="data.image.url" class="img-spinner">
  </picture>
</section>
</template>
<script>
export default {
  props: {
    data: Object
  }
};
</script>
<style lang="scss">
.portfolio-big-image {
  margin-bottom: 120px;
}
</style>
