import '../../scss/style.scss';

import Vue from "vue/dist/vue.esm.js"; // for some reason import Vue from vue doesn't include the runtime?

// VIEWS
import {homePage} from "./pages/homepage";
import {page} from "./pages/page";
import "./pages/blog.ts";
import "./pages/work.ts";

// import "../data/blogs.js";

const app = new Vue({
	el: '#app',
	data: {
		currentView: 'page',
		currentSlug: 'privacy',
		cta: {
			"text": "Return to Homepage",
			"action": null
		}
	},
	created: function(){
		this.cta.action = this.home;
	},
	methods: {
		home: function(){
			this.currentView = 'homePage';
			this.currentSlug = '';
		}
	},
	components: {
		homepage: homePage,
		page: page
	},
	template: "<component :is='currentView' :slug='currentSlug' :cta='cta'/>"
});
