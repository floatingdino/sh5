<template>
	<div class='wrapper'>
		<h1 v-if='page.title'>{{page.title}}</h1>
		<main class='wrapper-content'>
			<content-block v-if='page.sections' v-for='(content, index) in page.sections' :key='index' :content='content'></content-block>
		</main>
		<blogSidebar title='Work'/>
	</div>
</template>
<script>
import contentBlock from '../components/content-block';

import blogSidebar from '../components/blog-sidebar';
export default {
	props: {
		'page': Object
	},
	data:function(){
		return({
			"loaded": false,
			"title":"Sam Haakman", //Defaults until fetch can grab data
			"sections": []
		})
	},
	components: {
		blogSidebar: blogSidebar,
		contentBlock: contentBlock
	}
};
</script>
