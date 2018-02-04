declare interface ObjectConstructor {
    assign(...objects: Object[]): Object;
}

import '../../scss/style.scss';

import Vue from "vue/dist/vue.esm.js"; // for some reason import Vue from vue doesn't include the runtime?
import VueRouter from "vue-router";
Vue.use(VueRouter);

// VIEWS
import {route} from "./pages/route";
// import {page} from "./pages/page";
// // import "./pages/blog.ts"; //TODO: Add blog after Keystone
// import {workPage} from "./pages/work";

const routes = [ // TODO: Generic template that loads template according to JSON response
	// { path: '/', component: homePage, meta:{title:'Sam Haakman'}},
	// { path: '/privacy', component: page, meta:{title:'Privacy | Sam Haakman'}},
	// { path: '/coyo', component: workPage, meta:{title:'COYO | Sam Haakman'}},
	// { path: '/rf', component: workPage, meta:{title:'RUCKUS FIENDS | Sam Haakman'}},
	{ path: '*', component: route, meta: {title: 'Sam Haakman'}}
];

const router = new VueRouter({
	mode: 'history',
	routes: routes
});
router.beforeEach((to, from, next) => {
	document.title = to.meta.title;
	window.scrollTo(0,0);
	next();
})
const app = new Vue({
	router
}).$mount('#app');

import 'autotrack';
