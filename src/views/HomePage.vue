<template>
  <Header />
  <div class="container">
    <Search />
    <PopularShows />
    <TopRated />
    <LatestTrailers />
    <Trending />
  </div>
  <Footer />
</template>

<script>
import Search from "@/components/Search.vue";
import PopularShows from "@/components/PopularShows.vue";
import LatestTrailers from "@/components/LatestTrailers.vue";
import TopRated from "@/components/TopRated.vue";
import Trending from "@/components/Trending.vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
export default {
  components: {
    Search,
    PopularShows,
    LatestTrailers,
    TopRated,
    Trending,
    Header,
    Footer,
  },
};
</script>

<style lang="scss" scoped></style>
