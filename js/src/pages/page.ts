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
			'title': '',
			'loaded': false,
			'sections':[]
		});

	},
	created: function(){
		// TODO: plug into Keystone so that this can be managed through an interface, not just uploading plain JSON
		fetch(`/js/data/${this.$route.path}.json`) //ES6 string interpolation
			.then((resp) => resp.json())
			.then(function(data){
				Object.assign(this, data);
			}.bind(this))
			.catch(function(error){
				console.warn("Something went wrong with navigation", this);
				Object.assign(this, {
					'title': 404,
					'sections': [
						{ 'content': 'Oh. a 404. You know what this means, right?<br>You\'ve gone somewhere you shouldn\'t have. I\'ve had a few revisions on this site, so maybe you followed an old link here.'},
						{ 'content': 'Anyway, there\'s nothing here. You should go back to the homepage.'}
					]
				});
			}.bind(this));
	},
	template: `
		<div class='wrapper narrow-wrapper'>
			<h1 v-if='title'>{{title}}</h1>
			<main class='wrapper-content'>
				<content-block v-if='sections' v-for='(content, index) in sections' :key='index' :content='content'></content-block>
				<router-link class='btn' to='/'>Take me home</router-link>
			</main>
		</div>
	`
});
