import Vue from "vue/dist/vue.esm.js"; // for some reason import Vue from vue doesn't include the runtime?
import "whatwg-fetch";
import "./page.scss";


import {contentBlock} from '../components/content-block';

export const page = Vue.component('page', {
	props: {
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
		// TODO: plug into Keystone so that this can be managed through an interface, not just uploading plain JSON
		fetch(`/js/data/${this.$route.path}.json`) //ES6 string interpolation
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
				<router-link class='btn' to='/'>Take me home</router-link>\
			</main>\
		</div>\
	"
});
