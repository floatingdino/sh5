<template>
	<div>
		<div class="header-wrapper">
			<h2><router-link to="/">Sam Haakman</router-link></h2>
		</div>
		<div class="internal-page-wrapper">
			<div class='wrapper work-wrapper'>
				<h1 v-if='page.title'>{{page.title}}</h1>
				<main class='wrapper-content'>
					<carousel v-if='page.slideshow'
						:perPage='1'
						paginationActiveColor='#fab2d7'
						paginationColor='#333' >
						<slide v-for='(slide, index) in page.slideshow' :key='index'>
							<img :src='slide.src + slide.fileType' :srcset='slideSrcset(slide)'>
						</slide>
					</carousel>
					<content-block v-if='page.sections' v-for='(content, index) in page.sections' :key='index' :content='content'></content-block>
					<router-link role='button' class='btn btn-pink' to='/'>Go home</router-link>
				</main>
			</div>
		</div>
	</div>
</template>
<script>
import { Carousel, Slide } from 'vue-carousel';
import contentBlock from '../components/content-block';
export default {
	props: {
		page: Object
	},
	components: {
		contentBlock: contentBlock,
		Carousel,
		Slide
	},
	methods: {
		slideSrcset: function(img){
			let srcset = [];
			srcset.push(img.src + img.fileType + " " + img.baseSize + "w");

			img.srcset.forEach(function(size){
				srcset.push(img.src + "@" + size + img.fileType + " " + Math.round(img.baseSize * size) + "w");
			});
			return srcset;
		}
	}
};
</script>
<style lang="scss">
@import "work";
</style>
