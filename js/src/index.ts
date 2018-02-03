import '../../scss/style.scss';

import Vue from "vue/dist/vue.esm.js"; // for some reason import Vue from vue doesn't include the runtime?

// VIEWS
import {homePage} from "./pages/homepage";
import "./pages/blog.ts";
import "./pages/work.ts";

// import "../data/blogs.js";

const app = new Vue({
	el: '#app',
	data: {
		currentView: 'homePage'
	},
	components: {
		homepage: homePage
	},
	template: "<component v-bind:is='currentView'></component>"
});
