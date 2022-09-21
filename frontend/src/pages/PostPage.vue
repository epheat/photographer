<template>
  <div class="ps-post-page page">
    <template v-if="isLoading">
      <h1>Title</h1>
      <p>content loading...</p>
      <spinner></spinner>
    </template>
    <template v-else>
      <h1>{{ post.title }}</h1>
      <h2><span class="by">by</span> {{ post.author }}</h2>
      <h3>{{ localeDateString }}</h3>
      <div class="content" v-html="renderedContent" />
    </template>
    <div class="controls">
      <a href="#">⬅️ previous</a>
      <a href="#">next ➡️</a>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from '../components/Footer.vue';
import Spinner from '../components/Spinner.vue';
import { API } from 'aws-amplify';
import { marked } from 'marked';

export default {
  name: 'PostsPage',
  props: {

  },
  data() {
    return {
      isLoading: true,
      post: null
    }
  },
  async mounted() {
      try {
        const response = await API.get('ps-api', `/posts/${this.$route.params.postId}`);
        this.post = response.post;
        this.isLoading = false;
      } catch (err) {
        this.isLoading = false;
        console.log(err);
      }
  },
  computed: {
    localeDateString() {
      return new Date(this.post.createdDate).toLocaleString();
    },
    renderedContent() {
      if (this.post.content) {
        return marked(this.post.content);
      } else {
        return "";
      }
    }
  },
  components: {
    Footer,
    Spinner,
  }
}
</script>
<style lang="scss" scoped>
@import '../scss/colors.scss';
.ps-post-page {

  h2 {
    text-align: center;
    .by {
      font-size: 0.8em;
      font-weight: normal;
    }
  }

  .content ::v-deep(img) {
    margin: 0 auto;
    max-height: 400px;
    display: block;
    max-width: 100%;
  }

  .controls {
    display: flex;
    justify-content: space-between;
  }
}
</style>