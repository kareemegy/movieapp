<template>
  <div class="list_scroll" v-if="recommendationData">
    <h3>Recommendations</h3>
    <ul>
      <li v-for="recommendation in recommendationData" :key="recommendation.id">
        <router-link
          @click="redirect()"
          :to="
            `/details/${showType}/${recommendation.id}/${recommendationName(
              recommendation.name ?recommendation.name :recommendation.title 
            )} `
          "
        >
          <img
            v-lazyload
            width="280"
            height="244"
            :data-src="imgUrl(recommendation.backdrop_path)"
            :alt="recommendation.name"
          />
        </router-link>
        <p>{{ recommendation.name ?recommendation.name :recommendation.title }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: {
    showId: {
      type: Number,
      required: true,
    },
    showType: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      recommendationData: {},
      baseImageURL: "https://image.tmdb.org/t/p/w500/",
    };
  },
  methods: {
    getData() {
      axios
        .get(
          `https://api.themoviedb.org/3/${this.showType}/${this.showId}/recommendations?api_key=${process.env.VUE_APP_API_KEY}&language=en-US&page=1`
        )
        .then(({ data }) => {
          console.log(data);
          return (this.recommendationData = data.results);
        });
    },
    redirect() {
      console.log("worked");
    },
    imgUrl(path) {
      return this.baseImageURL + path;
    },
    recommendationName(showName) {
      if (showName) {
        return showName.replace(/ /g, "");
      }
    },
  },
  created() {
    this.getData();
  },
};
</script>

<style lang="scss" scoped>
.list_scroll {
  margin-top: 40px;
  margin-bottom: 100px;
  h3 {
    margin-left: 8px;
  }
  width: 700px;
  height: 200px;
  ul {
    display: flex;
    overflow: auto;
    white-space: nowrap;
    li {
      padding: 10px;
      img {
        border-radius: 20px;
      }
    }
  }
}
</style>
