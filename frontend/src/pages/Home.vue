<template>
    <div class="ps-home-page page">
        <h1>Home</h1>
        <p>Welcome to my website! I'm Evan, a.k.a. "photographer", and I put together this site to have a place to upload some blog posts, photos, music, and other creative bits of content. I'll try to occasionally update this site with more features and what not over time, but it's mostly just a side thing so don't expect too much. All the code for the site can be found over on my <a href="https://github.com/epheat/photographer-site">Github</a>. Enjoy!</p>
        <Footer></Footer>
    </div>
</template>
<script>
import Footer from '../components/Footer.vue';
export default {
    components: {
        Footer,
    }
}
</script>