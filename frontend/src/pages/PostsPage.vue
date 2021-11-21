<template>
    <div class="ps-posts-page page">
        <h1>Posts</h1>
        <spinner></spinner>
        <Footer></Footer>
    </div>
</template>

<script>
import Footer from '../components/Footer.vue';
import Spinner from '../components/Spinner.vue';
import { API } from 'aws-amplify';

export default {
  name: 'PostsPage',
  props: {

  },
  components: {
    Footer,
    Spinner
  }
}
</script>
<style lang="scss" scoped>
.ps-posts-page {

}
</style>