import Vue from "vue/dist/vue.esm.js"; // for some reason import Vue from vue doesn't include the runtime?
import "whatwg-fetch";

import {contentBlock} from '../components/content-block';

import {blogSidebar} from '../components/blog-sidebar';

export const homePage = Vue.component('homePage', {
	data:function(){
		return({
			"loaded": false,
			"title":"Sam Haakman", //Defaults until fetch can grab data
			"sections": []
		})
	},
	components: {
		blogSidebar: blogSidebar,
		contentBlock: contentBlock
	},
	created: function(){
		fetch("/js/data/homepage.json") // Eventually this will be plugged into Keystone, but for now it's just static JSON
		.then((resp) => resp.json())
		.then(function(data){
			Object.assign(this, data);
		}.bind(this));
	},
	template: "\
		<div class='wrapper'>\
			<h1 v-if='title'>{{title}}</h1>\
			<main class='wrapper-content'>\
				<content-block v-if='sections' v-for='(content, index) in sections' :key='index' :content='content'></content-block>\
			</main>\
			<blogSidebar title='Work'/>\
		</div>\
	"
});
