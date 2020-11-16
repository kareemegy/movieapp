<template>
  <div>
    <div class="d-flex">
      <h1>What's popular</h1>
      <div class="switch">
        <div class="onTv" :class="{ active: isActive }" @click="onTv">
          <h3 :class="{ switch_text_color: isSwitch }">On TV</h3>
        </div>
        <div
          class="inTheaters"
          :class="{ active: !isActive }"
          @click="inTheaters"
        >
          <h3 :class="{ switch_text_color: !isSwitch }">In Theaters</h3>
        </div>
      </div>
    </div>
    <swiper
      :slides-per-view="9"
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
      isActive: true,
      isSwitch: true,
    };
  },
  methods: {
    onSwiper(swiper) {
      console.log(swiper);
    },
    onSlideChange() {
      console.log("slide change");
    },
    onTv() {
      console.log("On TV");
      if (!this.isActive && !this.isSwitch) {
        this.isActive = true;
        this.isSwitch = true;
      }
    },
    inTheaters() {
      if (this.isActive && this.isSwitch) {
        this.isActive = false;
        this.isSwitch = false;
      }
      console.log("inTheaters");
    },
  },
  async created() {
    try {
      let response = await fetch(
        "https://api.themoviedb.org/3/movie/popular?api_key=37c26238f996be5bc2090ce0085ff210&language=en-US&page=1"
      );
      let data = await response.json();
      this.data = data;
    } catch (err) {
      console.error(err);
    }
  },
};
</script>

<style lang="scss" scoped>
h1 {
  font-size: 26px;
  margin: 20px 0px 5px 20px;
}
.img {
  width: 150px;
  height: 220px;
  border-radius: 10px;
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
    color: rgb(164, 164, 164);
  }
}

.d-flex {
  display: flex;
}
.switch {
  margin: 27px 0px 5px 27px;
  font-size: 12px;
  font-weight: 700;
  display: flex;
  align-items: center;
  border: 1px solid #032541;
  border-radius: 19px;
  :nth-child(1) {
    margin-right: 5px;
  }
  .onTv {
    height: 100%;
    border-radius: 10px;
  }
  .inTheaters {
    padding-left: 10px;
    margin-left: 15px;
    border-radius: 10px;
    height: 100%;
  }

  .active {
    background: #032541;
    transition: background 0.2s ease-in-out;
  }

  .switch_text_color {
    padding: 5px 30px 5px 30px;
    background-image: linear-gradient(
      to right,
      rgba(192, 254, 207, 1) 0%,
      rgba(30, 213, 169, 1) 100%
    );
    transition: background 0.2s ease-in-out;
    background-size: 100%;
    background-repeat: repeat;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -moz-background-clip: text;
    -moz-text-fill-color: transparent;
  }

  .inTheaters h3 {
    cursor: pointer;
    height: 100%;
    display: flex;
    align-items: center;
    padding-left: 5px;
  }
  .onTv h3 {
    cursor: pointer;
    height: 100%;
    display: flex;
    align-items: center;
    padding-left: 10px;
  }
}
</style>
