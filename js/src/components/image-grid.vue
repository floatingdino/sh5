<template>
<section class="portfolio-image-grid">
  <div class="portfolio-image-grid-image-wrapper img-spinner">
    <!-- <img class="portfolio-image-grid-primary" :src="data[selectedImg].image.url" :srcset="data[selectedImg].image.url + ', ' + data[selectedImg].image.retina.url + ' 2x'" v-on:load="loadImg" sizes="(min-width: 1400px) 1320px, 100vw"/> -->
    <img class="portfolio-image-grid-primary" :src="data[selectedImg].image.url" v-on:load="loadImg" />
  </div>
  <div class="portfolio-image-grid-thumbs">
    <img v-for="(item, index) in data" :class='{"selected": index === 0, "portfolio-image-grid-secondary": true, "img-spinner": true}' :src="item.image.thumb.url" :data-img="index" v-on:click="select" />
  </div>

</section>
</template>
<script>
export default {
  created() {
    console.log(this.data);
  },
  props: {
    data: Array
  },
  data() {
    return {
      selectedImg: 0
    };
  },
  methods: {
    select(e) {
      const el = e.target;
      const img = el.getAttribute("data-img");
      const primary = document.querySelector(".portfolio-image-grid-primary");
      const oldImg = document.querySelector(
        `img[data-img="${this.selectedImg}"]`
      );

      console.log(img);

      oldImg.classList.remove("selected");
      el.classList.add("selected");
      primary.classList.add("fadeOut");
      setTimeout(() => {
        primary.classList.remove("fadeOut");
        primary.classList.remove("loaded");
        this.selectedImg = img;
      }, 200);
    },
    loadImg(e) {
      e.target.classList.add("loaded");
    }
  }
};
</script>
<style lang="scss">
@import "image-grid";
</style>
