import './blog-sidebar.scss';

import Vue from "vue/dist/vue.esm.js"; // for some reason `import Vue from vue` doesn't include the runtime?

import "whatwg-fetch";

export const blogSidebar = Vue.component('blogSidebar', {
	props: {
		title: String,
		numberPreviews: {
			type: Number,
			default: 2
		}
	},
	data: function(){
		return ({
			loaded: false,
			blogs: []
		});
	},
	created: function(){ // Blogs should be stored higher up and passed down as a prop - TODO Refactor
		fetch('/js/data/blogs.json')
			.then((resp) => resp.json())
			.then(function(data){
				this.blogs = data.blogs;
				this.loaded = true;
			}.bind(this))
	},
	template: "\
	<aside class='blog-sidebar'>\
		<h2 v-if='title'>{{title}}</h2>\
		<blogPreview v-for='(blog, index) in blogs.slice(0, numberPreviews)' :key='index' :data='blog'/>\
		<span v-if='blogs.length > 2'>\
		<h2>Other cool sites I've built</h2>\
		<ul class='inline'>\
			<li v-for='(blog, index) in blogs.slice(2)' :key='index'>\
				<a :href='blog.url' target='_blank' rel='nofollow noopener'>{{blog.title}}</a>\
			</li>\
		</ul>\
		</span>\
	</aside>\
	"
});

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

Vue.component('blogPreview', {
	props: {
		data: Object
	},
	computed: {
		previewSrcset: function(){
			return generateSrcset(this.data.preview_image);
		}
	},
	template: "\
		<article>\
			<img :src='data.preview_image + \".png\"'\ :srcset='previewSrcset'>\
			<h3>{{data.title}}</h3>\
			<a role='button' class='btn'>Check it out</a>\
		</article>\
	"
});
