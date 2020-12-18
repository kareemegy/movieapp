<template>
  <div class="full_contianer" v-if="data" :style="sliderBG">
    <section class="container">
      <img :src="`${baseImageURL}${data.poster_path}`" :alt="`${data.name}`" />
      <div class="header_description">
        <h1>{{ data.name }}</h1>
        <h1>({{ firstAirDate.split("-")[0] }})</h1>
        <ul class="genres" v-for="(type, index) in data.genres" :key="index">
          <li>{{ type.name }}</li>
        </ul>
        <h1>{{ episodeRunTime }}M</h1>
        <h1>{{ data.tagline }}</h1>
        <h1>OverView</h1>
        <h1>{{ data.overview }}</h1>
        <h1>Creator</h1>
        <h1>{{ createdBy }}</h1>
      </div>
    </section>
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
      firstAirDate: "",
      episodeRunTime: "",
      createdBy: "",
      sliderBG: {
        backgroundImage: "",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
      },
    };
  },

  methods: {
    async getData(URL) {
      try {
        let response = await fetch(URL);
        let data = await response.json();
        this.data = data;
        this.firstAirDate = this.data.first_air_date;
        this.episodeRunTime = this.data.episode_run_time[0];
        this.createdBy = data.created_by[0].name;
        this.sliderBG.backgroundImage = `linear-gradient(
      to right,
      rgba(3, 37, 65, 0.8) 0%,
      rgba(3, 37, 65, 0) 100%
    ),url(${this.baseImageURL}${data.backdrop_path})`;
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

<style lang="scss" scoped>
.full_contianer {
  width: 100%;
}
section {
  display: grid;
  margin-top: 50px;
  li {
    list-style: none;
  }
  grid-template-columns: 350px 1fr;
  img {
    border-radius: 10px;
    height: 450px;
  }
}
</style>
