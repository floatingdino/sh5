import Vue from "vue/dist/vue.esm.js"; // for some reason import Vue from vue doesn't include the runtime?

export const contentBlock = Vue.component('content-block', {
	props: {
		'content': Object
	},
	template: `
		<span>
			<h2 v-if='content.title'>{{content.title}}</h2>
				<p v-if='content.link'><a :href='content.link' v-html='content.content'></a></p>
				<p v-if='!content.link' v-html='content.content'></p>
			<ul v-if='content.list'>
				<li v-for='listItem in content.list'>{{listItem}}</li>
			</ul>
		</span>
	`
});
