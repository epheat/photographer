<template>
  <div class="ps-post">
    <h2><router-link :to="`/posts/${postId}`">{{ title }}</router-link></h2>
    <div class="subtitle">by <b>{{ author }}</b> - <span>{{ localeDateString }}</span></div>
    <div class="content">{{ content }}</div>
  </div>
</template>
<script>
import { marked } from 'marked';

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
      return marked(this.content);
    },
    localeDateString() {
      return new Date(this.createdDate).toLocaleString();
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../scss/colors.scss";

.ps-post {
  h2 {
    margin: 5px 0px;
    a {
      text-decoration: none;
      color: inherit;
    }
  }
  .subtitle {
    margin: 5px 0px;
    span {
      color: $ps-light-grey;
    }
  }
  margin-bottom: 20px;
}
</style>