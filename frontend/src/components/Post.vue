<template>
  <div class="ps-post">
    <router-link :to="`/posts/${postId}`" class="image">
    </router-link>
    <div class="details">
      <h2><router-link :to="`/posts/${postId}`">{{ title }}</router-link></h2>
      <div class="subtitle">by <b>{{ author }}</b> - <span>{{ localeDateString }}</span></div>
      <div class="content">{{ trimmedContent }} <router-link :to="`/posts/${postId}`">view post</router-link></div>
    </div>
  </div>
</template>
<script>
import { marked } from 'marked';

export default {
  props: {
    postId: String,
    postType: String,
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
    },
    trimmedContent() {
      if (this.content.length > 200) {
        return this.content.substring(0, 200) + "...";
      } else {
        return this.content;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../scss/colors.scss";
@import "../scss/sizes.scss";

.ps-post {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;

  .image {
    flex: 0 0 60px;
    height: 60px;
    background-color: $ps-lighter-grey;

    @media screen and (max-width: $phone) {
      display: none;
    }
  }
  .details {
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

    .content {
      word-break: break-word;
    }
  }
}
</style>