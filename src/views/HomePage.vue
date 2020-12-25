<template>
  <div class="container">
    <Search />
    <PopularShows />
    <TopRated />
    <!-- <LatestTrailers /> -->
    <Trending />
  </div>
</template>

<script>
import Search from "@/components/Search.vue";
import PopularShows from "@/components/PopularShows.vue";
// import LatestTrailers from "@/components/LatestTrailers.vue";
import TopRated from "@/components/TopRated.vue";
import Trending from "@/components/Trending.vue";
// import GetDetails from '@/components/GetDetails.vue';
export default {
  components: {
    Search,
    PopularShows,
    TopRated,
    Trending,
  },
};
</script>

<style lang="scss" scoped></style>
