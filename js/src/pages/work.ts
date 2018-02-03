import Vue from "vue/dist/vue.esm.js"; // for some reason import Vue from vue doesn't include the runtime?
import "whatwg-fetch";


import {contentBlock} from '../components/content-block';

export const workPage = Vue.component('workPage', {
	data: function(){
		return({
			loaded: false
		});
	},
	components: {
		contentBlock: contentBlock
	}
});
