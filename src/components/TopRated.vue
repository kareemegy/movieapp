<template>
  <div>
    <div class="d-flex ">
      <!-- <h1>Latest Trailers</h1> -->
      <h1>Top Rated</h1>
      <div class="switch">
        <div class="onTv" :class="{ active: isActive }" @click="onTv">
          <h3 :class="{ switch_text_color: isSwitch }">Anime</h3>
        </div>
        <div
          class="inTheaters"
          :class="{ active: !isActive }"
          @click="inTheaters"
        >
          <h3 :class="{ switch_text_color: !isSwitch }">Shows</h3>
        </div>
      </div>
    </div>
    <!--  placeholder lib-->
    <swiper
      :slides-per-view="9"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
      :autoplay="true"
      :pagination="{ clickable: true }"
      navigation
      :options="swiperOption"
      :class="{
        fade_out: fade,
      }"
    >
      <swiper-slide
        class="slides"
        :class="{ fade_out: !fade2, fade_out2: data.results }"
        v-for="movie in data.results"
        :key="movie.id"
      >
        <router-link
          @click="redirect()"
          :to="
            `/details/${showType}/${movie.id}/${
              movie.title
                ? movie.title.replace(/ /g, '')
                : movie.name.replace(/ /g, '')
            }`
          "
        >
          <img
            v-lazyload
            class="img"
            :data-src="imgUrl(movie.poster_path)"
            :alt="movie.title ? movie.title : movie.name"
          />
        </router-link>

        <div class="movie_description " v-if="data.results">
          <h3 v-text="movie.title ? movie.title : movie.name"></h3>
          <h4
            v-text="
              movie.release_date
                ? 'Nov ' + movie.release_date
                : 'Nov ' + movie.first_air_date
            "
          ></h4>
        </div>
      </swiper-slide>
      <!-- place holder slides -->
      <swiper-slide
        class="slides"
        v-for="item in 10"
        :Key="item"
        v-show="!data.results"
      >
        <svg
          v-show="!data.results"
          role="img"
          width="400"
          height="460"
          aria-labelledby="loading-aria"
          viewBox="0 0 400 460"
          preserveAspectRatio="none"
        >
          <title id="loading-aria">Loading...</title>
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            clip-path="url(#clip-path)"
            style='fill: url("#fill");'
          ></rect>
          <defs>
            <clipPath id="clip-path">
              <rect x="19" y="4" rx="17" ry="17" width="131" height="175" />
              <rect x="24" y="189" rx="6" ry="6" width="104" height="17" />
              <rect x="24" y="215" rx="6" ry="6" width="75" height="17" />
            </clipPath>
            <linearGradient id="fill">
              <stop offset="0.599964" stop-color="#bec0c1" stop-opacity="1">
                <animate
                  attributeName="offset"
                  values="-2; -2; 1"
                  keyTimes="0; 0.25; 1"
                  dur="2s"
                  repeatCount="indefinite"
                ></animate>
              </stop>
              <stop offset="1.59996" stop-color="#ecebeb" stop-opacity="1">
                <animate
                  attributeName="offset"
                  values="-1; -1; 2"
                  keyTimes="0; 0.25; 1"
                  dur="2s"
                  repeatCount="indefinite"
                ></animate>
              </stop>
              <stop offset="2.59996" stop-color="#bec0c1" stop-opacity="1">
                <animate
                  attributeName="offset"
                  values="0; 0; 3"
                  keyTimes="0; 0.25; 1"
                  dur=".5s"
                  repeatCount="indefinite"
                ></animate>
              </stop>
            </linearGradient>
          </defs>
        </svg>
      </swiper-slide>
    </swiper>
  </div>
</template>
<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper";
SwiperCore.use([Autoplay, Pagination, Navigation]);
import "swiper/swiper.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/navigation/navigation.scss";
export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      baseImageURL: "https://image.tmdb.org/t/p/w500/",
      data: {},
      showType: "tv",
      onTvURl:
        "https://api.themoviedb.org/3/movie/top_rated?api_key=37c26238f996be5bc2090ce0085ff210&language=en-US&page=1",
      inTheatersURL:
        "https://api.themoviedb.org/3/tv/top_rated?api_key=37c26238f996be5bc2090ce0085ff210&language=en-US&page=1",
      isActive: true,
      isSwitch: true,
      fade: false,
      fade2: true,
      swiperOption: {},
      swiper: {},
    };
  },
  methods: {
    onSwiper(swiper) {
      this.swiper = swiper;
      console.log(swiper);
    },
    imgUrl(path) {
      return this.baseImageURL + path;
    },
    redirect() {
      console.log("dd");
    },
    onSlideChange() {
      // console.log("slide change");
    },
    async getData(URL) {
      try {
        let response = await fetch(URL);
        let data = await response.json();
        this.data = data;
      } catch (err) {
        console.error(err);
      }
    },
    onTv() {
      console.log("On TV");
      this.swiper.slideTo(0, 0);
      if (!this.isActive && !this.isSwitch) {
        this.showType = "tv";

        console.log(this.swiper);
        this.fade = false;
        this.fade2 = false;
        this.isActive = true;
        this.isSwitch = true;
        this.getData(this.inTheatersURL);
      }
    },
    inTheaters() {
      this.swiper.slideTo(0, 0);
      if (this.isActive && this.isSwitch) {
        this.showType = "movie";

        this.fade = true;
        this.fade2 = true;
        this.isActive = false;
        this.isSwitch = false;
        this.getData(this.onTvURl);
      }
      console.log("inTheaters");
    },
  },
  created() {
    this.getData(this.inTheatersURL);
  },
};
</script>

<style lang="scss" scoped>
.hide {
  display: none;
}

h1 {
  font-family: sans-serif;
  font-size: 26px;
  margin: 24px 0px 5px 20px;
}
.img {
  width: 150px;
  height: 250px;
  border-radius: 20px;
  padding: 8px;
}

.slides {
  height: 354px;
  width: auto;
}

.movie_description {
  padding: 8px;
  font-size: 13px;
  font-weight: 700;
  font-size: 14px;
  margin-left: 4px;
  width: 150px;
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
  .onTv,
  .inTheaters {
    height: 100%;
    border-radius: 10px;
  }
  .inTheaters {
    padding-left: 10px;
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

  .inTheaters,
  .onTv h3 {
    cursor: pointer;
    height: 100%;
    display: flex;
    align-items: center;
  }
  .inTheaters h3 {
    padding-left: 5px;
    padding-right: 20px;
  }
  .onTv h3 {
    padding-right: 30px;
    padding-left: 10px;
  }
}

.fade_out {
  animation: fadeIn ease-in-out 1.1s;
}
.fade_out2 {
  animation: fadeIn ease-in-out 1.1s;
}
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
