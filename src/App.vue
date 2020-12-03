<template>
  <div id="app">
    <Header />
    <div class="container">
      <router-view />
    </div>
    <!-- <Footer /> -->
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
// import Footer from "@/components/Footer.vue";
export default {
  components: {
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
