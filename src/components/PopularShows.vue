<template>
  <div>
    <h1>What's popular</h1>
    <swiper
      :slides-per-view="10"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
    >
      <swiper-slide
        class="slides"
        v-for="movie in data.results"
        :key="movie.id"
      >
        <img
          class="img"
          :src="baseImageURL + movie.poster_path"
          alt="movie image"
        />
        <div class="movie_description">
          <h3 v-text="movie.title"></h3>
          <h4 v-text="movie.release_date"></h4>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/swiper.scss";
export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      baseImageURL: "https://image.tmdb.org/t/p/w500/",
      data: {},
    };
  },
  methods: {
    onSwiper(swiper) {
      console.log(swiper);
    },
    onSlideChange() {
      console.log("slide change");
    },
  },
  created() {
    fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=37c26238f996be5bc2090ce0085ff210&language=en-US&page=1"
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data.results);
        this.data = data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style lang="scss" scoped>
h1 {
 font-size: 26px; 
 margin: 20px 0px 5px 20px;
 
}
.slides {
  margin: 10px 20px;
}

.movie_description {
  font-size: 13px;
  font-weight: 700;
  font-size: 14px;
  margin-left: 4px;
  h4 {
    margin-top: 3px;
    color: rgb(164 ,164 ,164);
  }
}
.img {
  width: 150px;
  height: 220px;
  border-radius: 10px;
}
</style>
