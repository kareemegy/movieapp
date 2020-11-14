<template>
  <div id="app">
    <Header />
    <div class="container">
      <Search />
      <PopularShows />
    </div>
    <!-- <router-view /> -->
  </div>
</template>

<script>
import Search from "@/components/Search.vue";
import PopularShows from "@/components/PopularShows.vue";
import Header from "@/components/Header.vue";
export default {
  components: {
    Search,
    PopularShows,
    Header,
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
