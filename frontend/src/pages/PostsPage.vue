<template>
    <div class="ps-posts-page page">
        <h1>Posts</h1>
        <Footer></Footer>
    </div>
</template>

<script>
import Footer from '../components/Footer.vue';
export default {
  name: 'PostsPage',
  props: {

  },
  components: {
    Footer,
  }
}
</script>