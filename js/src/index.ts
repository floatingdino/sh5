import '../../scss/style.scss';

import Vue from "vue/dist/vue.esm.js"; // for some reason import Vue from vue doesn't include the runtime?
import VueRouter from "vue-router";
Vue.use(VueRouter);

// VIEWS
import {homePage} from "./pages/homepage";
import {page} from "./pages/page";
import "./pages/blog.ts";
import {workPage} from "./pages/work";

const routes = [ // TODO: Generic template that loads template according to JSON response
	{ path: '/', component: homePage},
	{ path: '/privacy', component: page}
];

const router = new VueRouter({
	mode: 'history',
	routes: routes
});

const app = new Vue({
	router
}).$mount('#app');
