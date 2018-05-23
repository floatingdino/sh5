<template>
  <div>
    <div class="header-wrapper">
      <h2><router-link to="/">Sam Haakman</router-link></h2>
    </div>
    <div class="internal-page-wrapper">
      <header class="portfolio-header">
        <picture>
          <source sizes="100vw" :srcset="page.data.featured_image.mobile.url
          /* + ', ' + page.data.featured_image.mobile_retina.url + ' 2x' */
          " media="(max-width:1024px)"/>
          <source sizes="(min-width:768px) 840px, 100vw" :srcset="page.data.featured_image.url
          /* + ', ' +  page.data.featured_image.retina.url + ' 2x' */
          " />
          <img :src="page.data.featured_image.url" sizes="(min-width:768px) 840px, 100vw" :srcset="page.data.featured_image.url
          /* + ', ' + page.data.featured_image.retina.url + ' 2x' */
          " class="portfolio-header-image img-spinner" />
        </picture>
        <div class="portfolio-header-text">
          <div>
            <h1 v-if="page.data.title && page.data.site_link">
              <a :href="page.data.site_link.url" rel="nofollow noopener" target="_blank" title="Check out the live site" class="pink-bg-text">
                {{PrismicDOM.RichText.asText(page.data.title)}} <span class="portfolio-header-arrow-wrapper">→</span>
              </a>
            </h1>
            <h1 v-if="page.data.title && ! page.data.site_link">
              <span class="pink-bg-text">{{PrismicDOM.RichText.asText(page.data.title)}}</span>
            </h1>
            <p class="portfolio-header-text-details" v-if="page.data.studio || page.data.project_date" title="Studio and Project Date">
              <span class="pink-bg-text">
                {{PrismicDOM.RichText.asText(page.data.studio)}}
                <span v-if="page.data.studio && page.data.project_date">▴</span>
                <time>{{project_date}}</time>
              </span>
            </p>
            <p class="portfolio-header-text-details" v-if="page.data.excerpt"><span class="pink-bg-text" v-html="PrismicDOM.RichText.asText(page.data.excerpt)" /></p>
          </div>
        </div>
      </header>
      <div class="wrapper work-wrapper">
        <main class="wrapper-content">
          <component v-for="(slice, index) in page.data.body1" :is="slice.slice_type" :key="index" :index="index" :data="slice.slice_type == 'image_grid' ? slice.items : slice.primary" />
          <router-link role="button" class="btn" to="/">Go home</router-link>
        </main>
      </div>
    </div>
  </div>
</template>
<script>
// import imageGrid from "../components/image-grid";
// import workContentBlock from "../components/work-content-block";
// import fullWidthImage from "../components/full-width-image";

const imageGrid = () =>
  import(/* webpackChunkName: "portfolio-image-grid" */ "components/image-grid");
const workContentBlock = () =>
  import(/* webpackChunkName: "portfolio-content-block"  */ "components/work-content-block");
const fullWidthImage = () =>
  import(/* webpackChunkName: "portfolio-full-width-image" */ "components/full-width-image");

const PrismicDOM = require("prismic-dom");

export default {
  props: {
    page: Object,
    api: Object
  },
  components: {
    image_grid: imageGrid,
    content_block: workContentBlock,
    big_image: fullWidthImage
  },
  data() {
    return {
      PrismicDOM
    };
  },
  computed: {
    project_date() {
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];
      const date = new Date(this.page.data.project_date);

      return `${months[date.getMonth()]} ${date.getFullYear()}`;
    }
  }
};
</script>
<style lang="scss">
@import "work";
</style>
