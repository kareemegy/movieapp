<template>
  <div id="app">
    <div>
      <router-view />
      <vue3-progress-bar />
    </div>
  </div>
</template>

<script>
export default {
  components: {
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
