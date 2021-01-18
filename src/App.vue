<template>
  <div id="app">
    <Header />
    <div>
      <router-view />
      <vue3-progress-bar />
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
export default {
  components: {
    Header,
    Footer,
  },
};
</script>

<style>
* {
  font-family: "Source Sans Pro", Arial, sans-serif;
}

.container {
  width: 1300px;
  margin: 0px auto;
}
</style>
