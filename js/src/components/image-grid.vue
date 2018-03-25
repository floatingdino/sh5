<template>
<section class="portfolio-image-grid img-spinner">
  <img class="portfolio-image-grid-primary" :src="data.grid_1.url" :srcset="data.grid_1.url + ', ' + data.grid_1.retina.url + ' 2x'" />
  <img class="portfolio-image-grid-secondary" :src="data.grid_2.url" :srcset="data.grid_2.url + ', ' + data.grid_2.retina.url + ' 2x'" />
  <img class="portfolio-image-grid-secondary" :src="data.grid_3.url" :srcset="data.grid_3.url + ', ' + data.grid_3.retina.url + ' 2x'" />
</section>
</template>
<script>
export default {
  props: {
    data: Object,
  },
};
</script>
<style lang="scss">
@import "image-grid";
</style>
