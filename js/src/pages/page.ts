import Vue from "vue/dist/vue.esm.js"; // for some reason import Vue from vue doesn't include the runtime?

import "./page.scss";

import "whatwg-fetch";


import {contentBlock} from '../components/content-block';

export const page = Vue.component('page', {
	props: {
		'slug': String,
		'cta': Object
	},
	data: function(){
		return ({
			'heading': '',
			'loaded': false,
			'sections':[]
		});

	},
	created: function(){
		fetch(`/js/data/${this.slug}.json`) //ES6 string interpolation
			.then((resp) => resp.json())
			.then(function(data){
				this.heading = data.heading;
				this.sections = data.sections;
			}.bind(this));
	},
	template: "\
		<div class='wrapper narrow-wrapper'>\
			<h1 v-if='heading'>{{heading}}</h1>\
			<main class='wrapper-content'>\
				<content-block v-if='sections' v-for='(content, index) in sections' :key='index' :content='content'></content-block>\
				<button v-if='cta' class='btn' v-on:click='cta.action'>{{cta.text}}</button>\
			</main>\
		</div>\
	"
});
