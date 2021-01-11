<template>
  <div id="app">
    <Header />
    <div>
      <router-view />
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
    Footer
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
li{
  list-style: none;
}
a{
  text-decoration: none;
  color:black;
}
.container {
  width: 1300px;
  margin: 0px auto;
}
</style>
