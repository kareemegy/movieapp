<template>
  <div>
    <h1>i'm the details component :)</h1>
    <h1>{{ showID }}</h1>
    <h1>{{ showType }}</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showID: 0,
      showType: "",
      api_key: "37c26238f996be5bc2090ce0085ff210&language=en-US",
      baseImageURL: "https://image.tmdb.org/t/p/w500/",
      baseIViedoURL: " https://www.youtube.com/watch?v=",
      URL: "",
      data: {},
    };
  },

  methods: {
    async getData(URL) {
      try {
        let response = await fetch(URL);
        let data = await response.json();
        this.data = data;
        console.log(this.data.name);
      } catch (err) {
        console.error(err);
      }
    },
  },
  created() {
    this.showID = this.$route.params.id;
    this.showType = this.$route.params.type;
    this.URL = `https://api.themoviedb.org/3/${this.showType}/${this.showID}?api_key=${this.api_key}`;
    this.getData(this.URL);
  },
};
</script>

<style lang="scss" scoped></style>
