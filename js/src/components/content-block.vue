<template>
  <div>
    <h2 v-if='content.title'>{{content.title}}</h2>
      <p v-if='content.link'><a :href='content.link' v-html='content.content'></a></p>
      <p v-if='!content.link' v-html='content.content'></p>
    <ul v-if='content.list'>
      <li v-for='listItem in content.list'>{{listItem}}</li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    content: Object
  }
};
</script>
