<template>
  <div class="list_scroll" v-if="recommendationData">
    <h3>Recommendations</h3>
    <ul v-if="recommendationData.name">
      <li v-for="recommendation in recommendationData" :key="recommendation.id">
        <router-link
          @click="redirect()"
          :to="
            `/details/${showType}/${
              recommendation.id
            }/${recommendation.name.replace(/ /g, '')}`
          "
        >
          <img
            :src="baseImageURL + recommendation.backdrop_path"
            :alt="'img for' + recommendation.name"
          />
          <p>{{ recommendation.name }}</p>
        </router-link>
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
          return (this.recommendationData = data.results);
        });
    },
    redirect() {
      console.log("worked");
    },
  },
  created() {
    this.getData();
  },
  watch: {
    baseImageURL(newVal, oldVal) {
      console.log(newVal, oldVal);
    },
  },
};
</script>

<style lang="scss" scoped>
.list_scroll {
  margin-top: 40px;
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
        width: 280px;
        height: 150px;
      }
    }
  }
}
</style>
