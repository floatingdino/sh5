import Vue from "vue/dist/vue.esm.js"; // for some reason import Vue from vue doesn't include the runtime?
import {homePage} from "./homepage";
import {page} from "./page";
// import "./pages/blog.ts"; //TODO: Add blog after Keystone
import {workPage} from "./work";

import "whatwg-fetch";


import "./route.scss";


export const route = Vue.component('route', {
	props: {
		'cta': Object,
	},
	components: {
		homePage: homePage,
		page: page,
		work: workPage
	},
	data: function(){
		return ({
			'template': '',
			'loading': true,
			'dataPath': function(){
				return `/js/data/${this.$route.path == "/" ? 'homepage' : this.$route.path}.json`;
			},
			'slug': this.$route.path,
			'page': {}
		});

	},
	methods:{
		updatePageData: function(){
			this.page = {};
			this.loading = true;
			// TODO: plug into Keystone so that this can be managed through an interface, not just uploading plain JSON
			fetch(this.dataPath()) //ES6 string interpolation
				.then((resp) => resp.json())
				.then(function(data){
					this.template = data.template;
					this.slug = data.slug;
					this.loading = false;
					(<any>Object).assign(this.page, data);
				}.bind(this))
				.catch(function(error){
					console.warn("Something went wrong with navigation", this);
					(<any>Object).assign(this, {
						'title': 404,
						'template': 'page',
						'sections': [
							{ 'content': 'Oh. a 404. You know what this means, right?<br>You\'ve gone somewhere you shouldn\'t have. I\'ve had a few revisions on this site, so maybe you followed an old link here.'},
							{ 'content': 'Anyway, there\'s nothing here. You should go back to the homepage.'}
						]
					});
				}.bind(this));
		}
	},
	beforeUpdate:function(){
		if(this.slug != this.$route.path && `/${this.slug}` != this.$route.path){
			this.updatePageData();
		}
	},
	created: function(){
		this.updatePageData();
	},
	template: `
		<transition name="v-loader" mode="out-in">
			<component v-if="!loading" :is="template" :page="page" />
			<img v-if="loading" src="/img/thick-spinner.svg" class="route-spinner" title="Loading..." alt="Loading, please wait">
		</transition>
	`
});
