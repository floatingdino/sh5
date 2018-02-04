<template>
	<article>
		<img :src='data.preview_image + ".png"' :srcset='previewSrcset' v-on:load='load()' :class='{"lazy-img-preview":true, loaded : this.loaded}'>
		<h3>{{data.title}}</h3>
		<router-link role='button' class='btn' :to='data.slug'>Check it out</router-link>
	</article>
</template>
<script>
export default {
	props: {
		data: Object
	},
	data: function(){
		return {loaded: this.loaded}
	},
	created: function(){
		this.loaded = false;
	},
	computed: {
		previewSrcset: function(){
			return generateSrcset(this.data.preview_image);
		}
	},
	methods: {
		load: function(){
			this.loaded = true;
		}
	}
};
function generateSrcset(src){
	const baseSize = 697;
	const sizes = [0.5, 1.5];
	const filetype = ".png";

	let srcset = [];

	srcset.push(src + filetype + " " + baseSize + "w");

	sizes.forEach(function(size){
		srcset.push(src + "@" + size + filetype + " " + Math.round(baseSize * size) + "w");
	});
	return srcset;
}
</script>
