<template>
	<div class='wrapper narrow-wrapper'>
		<h1 v-if='page.title'>{{page.title}}</h1>
		<main class='wrapper-content'>
			<content-block v-if='page.sections' v-for='(content, index) in page.sections' :key='index' :content='content'></content-block>
			<router-link class='btn' to='/'>Take me home</router-link>
		</main>
	</div>
</template>
<script>
import contentBlock from '../components/content-block';
export default {
	props: {
		'cta': Object,
		'page': Object
	},
	data: function(){
		return ({
			'title': '',
			'loaded': false,
			'sections':[]
		});

	},
	components: {
		contentBlock: contentBlock
	}
};
</script>
<style lang="scss">
@import "page";
</style>
