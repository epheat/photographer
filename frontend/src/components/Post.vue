<template>
  <div class="ps-post">
    <h2>{{ title }}</h2>
    <h3>{{ createdDate }} - by {{ author }}</h3>
    <div class="content">{{ content }}</div>
  </div>
</template>
<script>
import marked from 'marked';

export default {
  props: {
    postId: String,
    title: String,
    author: String,
    content: String,
    createdDate: Number,
  },
  data() {
    return {

    }
  },
  computed: {
    compiledMarkdown() {
      return marked(this.content, { sanitize: true });
    }
  }
}
</script>

<style lang="scss" scoped>
.ps-component {
  text-align: center;
}
</style>