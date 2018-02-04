<template>
	<aside class='blog-sidebar'>
		<h2 v-if='title'>{{title}}</h2>
		<blog-preview v-for='(blog, index) in blogs.slice(0, numberPreviews)' :key='index' :data='blog'/>
		<span v-if='blogs.length > 2'>
		<h2>Other cool sites I've built</h2>
		<ul class='inline'>
			<li v-for='(blog, index) in blogs.slice(2)' :key='index'>
				<a :href='blog.url' target='_blank' rel='nofollow noopener'>{{blog.title}}</a>
			</li>
		</ul>
		</span>
		<p><router-link to='/privacy'>Read my super-exciting privacy policy</router-link></p>
	</aside>
</template>
<script>
import "whatwg-fetch";
import blogPreview from "./blog-preview";
export default {
	props: {
		title: String,
		numberPreviews: {
			type: Number,
			default: 2
		}
	},
	data: function(){
		return ({ // Defaults to empty and then fetches data in created
			loaded: false,
			blogs: []
		});
	},
	created: function(){ // Blogs should be stored higher up and passed down as a prop - TODO Refactor
		fetch('/js/data/blogs.json')
			.then((resp) => resp.json())
			.then(function(data){
				Object.assign(this, data);
			}.bind(this))
	},
	components: {
		blogPreview: blogPreview
	}
};
</script>
<style lang="scss">
@import 'blog-sidebar';
</style>
