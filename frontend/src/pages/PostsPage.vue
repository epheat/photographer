<template>
    <div class="ps-posts-page page">
        <h1>Posts</h1>
        <router-link to="/posts/new">New Post</router-link>
        <spinner v-if="isLoading"></spinner>
        <post
          v-for="post in posts"
          :key="post.postId"
          v-bind="post"
        />
        <Footer></Footer>
    </div>
</template>

<script>
import Footer from '../components/Footer.vue';
import Spinner from '../components/Spinner.vue';
import { API } from 'aws-amplify';
import Post from '../components/Post.vue';

export default {
  name: 'PostsPage',
  props: {

  },
  data() {
    return {
      isLoading: true,
      posts: [],
    }
  },
  async mounted() {
    try {
      const posts = await API.get('ps-api', '/posts');
      this.posts = posts.items;
      this.isLoading = false;
    } catch (err) {
      // TODO: error message
      this.isLoading = false;
      console.log(err);
    }
  },
  components: {
    Footer,
    Spinner,
    Post
  }
}
</script>
<style lang="scss" scoped>
.ps-posts-page {

}
</style>