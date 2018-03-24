<template>
  <article :data-id="id">
    <img :src='data.data.preview_image.url' v-on:load='load()' :class='{"lazy-img-preview":true, loaded : this.loaded}' :srcset='srcset' sizes="(min-width: 1400px) 400px, (min-width: 950px) 33vw, 100vw ">
    <h3>{{PrismicDOM.RichText.asText(data.data.title)}}</h3>
    <router-link role='button' class='btn' :to='`portfolio/${data.uid}`'>Check it out</router-link>
  </article>
</template>
<script>
const PrismicDOM = require("prismic-dom");
export default {
  props: {
    data: Object,
    slugs: Array,
    id: String
  },
  data: function() {
    return {
      loaded: this.loaded,
      PrismicDOM
    };
  },
  created: function() {
    this.loaded = false;
  },
  methods: {
    load: function() {
      this.loaded = true;
    }
  },
  computed: {
    srcset: function() {
      return `${this.data.data.preview_image.url} 400w, ${
        this.data.data.preview_image.retina.url
      } 600w`;
    }
  }
};
</script>
