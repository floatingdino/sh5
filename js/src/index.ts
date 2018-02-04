import Vue from "vue/dist/vue.min.js";
import VueRouter from "vue-router";
Vue.use(VueRouter);

// VIEWS
import route from "./pages/route";

const routes = [
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
new Vue({
	router
}).$mount('#app');

import {outboundLinkTracker, urlChangeTracker} from 'autotrack';
