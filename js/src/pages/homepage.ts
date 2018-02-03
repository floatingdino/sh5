import "./homepage.scss";

import Vue from "vue/dist/vue.esm.js"; // for some reason import Vue from vue doesn't include the runtime?

import "whatwg-fetch";

Vue.component('content-block', {
	props: {
		'content': Object
	},
	created: function(){
		console.log(this.content);
	},
	template: "\
		<span>\
			<h2 v-if='content.title'>{{content.title}}</h2>\
			<a v-if='content.content && content.content.link' :link='content.content.link'>\
				<p v-html='content.content'></p>\
			</a>\
			<ul v-if='content.list'>\
				<li v-for='listItem in content.list'>{{listItem}}</li>\
			</ul>\
		</span>\
	"
});



export const homePage = Vue.component('homePage', {
	data:function(){
		return({
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
	created: function(){
		fetch("/js/data/homepage.json") // Eventually this will be plugged into Keystone, but for now it's just static JSON
		.then((resp) => resp.json())
		.then(function(data){
			this.heading = data.heading;
			this.sections = data.sections;
			console.log(this);
		}.bind(this));
	},
	template: "\
		<div class='wrapper'>\
			<h1 v-if='heading'>{{heading}}</h1>\
			<main class='wrapper-content'>\
				<content-block v-if='sections' v-for='(content, index) in sections' :key='index' :content='content'></content-block>\
			</main>\
		</div>\
	"
});
