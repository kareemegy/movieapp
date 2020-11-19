<template>
  <div id="app">
    <Header />
    <div class="container">
      <Search />
      <PopularShows />
      <!-- <TrendingMovies /> -->
    </div>
  </div>
</template>

<script>
import Search from "@/components/Search.vue";
import PopularShows from "@/components/PopularShows.vue";
import Header from "@/components/Header.vue";
// import TrendingMovies from "@/components/TrendingMovies.vue";
export default {
  components: {
    Search,
    PopularShows,
    Header,
    // TrendingMovies,
  },
};
</script>

<style>
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
