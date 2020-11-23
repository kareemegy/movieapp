<template>
  <div id="app">
    <Header />
    <div class="container">
      <Search />
      <PopularShows />
      <TopRated />
      <LatestTrailers />
      <Trending />
    </div>
  </div>
</template>

<script>
import Search from "@/components/Search.vue";
import PopularShows from "@/components/PopularShows.vue";
import Header from "@/components/Header.vue";
import LatestTrailers from "@/components/LatestTrailers.vue";
import TopRated from "@/components/TopRated.vue";
import Trending from "@/components/Trending.vue";
export default {
  components: {
    Search,
    PopularShows,
    Header,
    LatestTrailers,
    TopRated,
    Trending,
  },
};
</script>

<style>
body {
  height: 3000px;
}
* {
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
.container {
  width: 1300px;
  margin: 0px auto;
}
</style>
