<template>
  <div class="content-wrapper">
    <!-- Displays if myData is not set.
    Options
    speed: Number - How many seconds between pulses of the loader.
    height / width: Number - size of the loader contents.
    primaryColor: String - The color of the elements.
    secondaryColor: String - The color of the pulser.
    animate: Boolean - Whether or not to display the pulser.
    -->
    <content-loader v-if="!myData" :speed="2" :animate="true"></content-loader>
    <div v-else class="my-real-content">
      <!-- Your real loaded data goes in here. -->
      <p>{{ myData }}</p>
    </div>
  </div>
</template>

<script>
import { ContentLoader } from "vue-content-loader";

export default {
  components: {
    ContentLoader,
  },

  data() {
    return {
      myData: null,
    };
  },

  mounted() {
    // Just pretend this is an AJAX call. Use your imagination.
    setTimeout(() => {
      this.myData = "Example Data";
    }, 5000);
  },
};
</script>
