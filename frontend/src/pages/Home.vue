<template>
  <div class="ps-home-page page">
    <h1>Home</h1>
    <p>Welcome to my website! I'm Evan, and I put together this site to have a place to upload some blog posts, photos, music, and other creative bits of content. I'll try to occasionally update this site with more features and what not over time, but it's mostly just a side thing so don't expect too much. All the code for the site can be found over on my <a href="https://github.com/epheat/photographer-site">Github</a>. Enjoy!</p>
    <div class="profile-pictures">
      <img :src="profile1" alt="profile1"/>
      <img :src="profile2" alt="profile2"/>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
import Footer from '../components/Footer.vue';
import Profile1 from "@/assets/profile.jpg";
import Profile2 from "@/assets/profile2.jpg";

export default {
  components: {
    Footer,
  },
  data: function() {
    return {
      profile1: Profile1,
      profile2: Profile2,
    }
  }
}
</script>

<style scoped lang="scss">
@import "../scss/sizes.scss";

.profile-pictures {
  padding: 5px;
  display: flex;
  justify-content: space-around;
  align-items: center;

  @media screen and (max-width: $phone) {
    flex-direction: column;
  }

  img {
    max-width: 40%;
    border-radius: 6px;
    margin-bottom: 10px;

    @media screen and (max-width: $phone) {
      max-width: 90%;
    }
  }
}
</style>