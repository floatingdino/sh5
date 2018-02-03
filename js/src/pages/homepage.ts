import "./homepage.scss";



import Vue from "vue/dist/vue.esm.js"; // for some reason import Vue from vue doesn't include the runtime?

import "whatwg-fetch";

Vue.component('content-block', {
	props: {
		'content': Object
	},
	template: "\
		<span>\
			<h2 v-if='content.title'>{{content.title}}</h2>\
				<p v-if='content.link'><a :href='content.link' v-html='content.content'></a></p>\
				<p v-if='!content.link' v-html='content.content'></p>\
			<ul v-if='content.list'>\
				<li v-for='listItem in content.list'>{{listItem}}</li>\
			</ul>\
		</span>\
	"
});

import {blogSidebar} from '../components/blog-sidebar';

export const homePage = Vue.component('homePage', {
	data:function(){
		return({
			"loaded": false,
			"heading":"Sam Haakman", //Defaults until fetch can grab data
			"sections": [
				{
					"title": null,
					"content": null,
					"list": null
				}
			]
		})
	},
	components: {
		blogSidebar: blogSidebar
	},
	created: function(){
		fetch("/js/data/homepage.json") // Eventually this will be plugged into Keystone, but for now it's just static JSON
		.then((resp) => resp.json())
		.then(function(data){
			this.heading = data.heading;
			this.sections = data.sections;
		}.bind(this));
	},
	template: "\
		<div class='wrapper'>\
			<h1 v-if='heading'>{{heading}}</h1>\
			<main class='wrapper-content'>\
				<content-block v-if='sections' v-for='(content, index) in sections' :key='index' :content='content'></content-block>\
			</main>\
			<blogSidebar title='Work'/>\
		</div>\
	"
});
