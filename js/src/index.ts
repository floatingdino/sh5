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
	{ path: '/', component: homePage, meta:{title:'Sam Haakman'}},
	{ path: '/privacy', component: page, meta:{title:'Privacy | Sam Haakman'}},
	{ path: '/coyo', component: workPage, meta:{title:'COYO | Sam Haakman'}},
	{ path: '/rf', component: workPage, meta:{title:'RUCKUS FIENDS | Sam Haakman'}}
];

const router = new VueRouter({
	mode: 'history',
	routes: routes
});
router.beforeEach((to, from, next) => {
	document.title = to.meta.title;
	next();
})
const app = new Vue({
	router
}).$mount('#app');
