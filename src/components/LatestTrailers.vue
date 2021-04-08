<template>
  <div>
    <div class="d-flex ">
      <h1>Latest Trailers</h1>
      <div class="switch">
        <div class="onTv" :class="{ active: isActive }" @click="onTv">
          <h3 :class="{ switch_text_color: isSwitch }">On Tv</h3>
        </div>
        <div
          class="inTheaters"
          :class="{ active: !isActive }"
          @click="inTheaters"
        >
          <h3 :class="{ switch_text_color: !isSwitch }">inTheaters</h3>
        </div>
      </div>
    </div>

    <swiper
      :slides-per-view="4"
      @swiper="onSwiper"
      class="slider_container bg_img"
      :style="sliderBG.backgroundImage ? sliderBG : placeholderBG"
      :class="{
        fade_out: fade,
      }"
    >
      <swiper-slide
        class="slides"
        :class="{ fade_out: !fade2, fade_out2: data.results }"
        v-for="movie in data.results"
        :key="movie.id"
        @click="showTrailer(movie)"
      >
        <div class="imgcontainer">
          <img
            class="img"
            @mouseenter="
              changeBackgroundImage(baseImageURL + movie.poster_path)
            "
            :src="baseImageURL + movie.poster_path"
            alt="movie image"
          />
          <img src="../assets/playicon.png" alt="play icon" class="playicon" />
        </div>
        <div class="movie_description " v-if="data.results">
          <h3 v-text="movie.title ? movie.title : movie.name"></h3>
          <!-- <h4 v-text="handleOverviewText(movie.overview)"></h4> -->
        </div>
        <!-- <iframe
          width="560"
          height="280"
          :src="trailerURL"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe> -->
      </swiper-slide>
      <swiper-slide
        v-show="!data.results"
        class="slides"
        v-for="item in 4"
        :Key="item"
      >
        <svg
          v-if="!data.results"
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
                  dur="2s"
                  repeatCount="indefinite"
                ></animate>
              </stop>
            </linearGradient>
          </defs>
        </svg>
      </swiper-slide>
      <div class="slider_img_wrapper"></div>
    </swiper>
  </div>
</template>
<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/swiper.scss";
import axios from "axios";
export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      baseImageURL: "https://image.tmdb.org/t/p/w500/",
      data: {},
      trailersData: {},
      trailerURL: "",
      isMovieOrTv: "movie",
      onTvURl:
        "https://api.themoviedb.org/3/movie/popular?api_key=37c26238f996be5bc2090ce0085ff210&language=en-US&page=1",
      inTheatersURL:
        "https://api.themoviedb.org/3/tv/popular?api_key=37c26238f996be5bc2090ce0085ff210&language=en-US&page=1",

      isActive: true,
      isSwitch: true,
      fade: false,
      fade2: true,
      sliderBG: {
        backgroundImage: "",
      },
      placeholderBG: {
        backgroundImage:
          "linear-gradient(to right, rgba(3, 37, 65, 0.8) 0%, rgb(3 37 65 / 22%) 100%)",
      },
    };
  },
  methods: {
    onSwiper() {
      // console.log(swiper);
    },
    async getData(URL) {
      try {
        let response = await fetch(URL);
        let data = await response.json();
        this.data = data;
        // console.log(data);
        this.changeBackgroundImage(
          this.baseImageURL + this.data.results[0].poster_path
        );
      } catch (err) {
        console.error(err);
      }
    },
    handleOverviewText(text) {
      return text.substring(0, 95);
    },

    changeBackgroundImage(imgPATH) {
      this.sliderBG.backgroundImage = `url(${imgPATH})`;
    },
    async onTv() {
      console.log("On TV");
      if (!this.isActive && !this.isSwitch) {
        this.fade = false;
        this.fade2 = false;
        this.isActive = true;
        this.isSwitch = true;
        this.getData(this.inTheatersURL);
        this.isMovieOrTv = "movie";
      }
    },
    async inTheaters() {
      if (this.isActive && this.isSwitch) {
        this.fade = true;
        this.fade2 = true;
        this.isActive = false;
        this.isSwitch = false;
        this.getData(this.onTvURl);
        this.isMovieOrTv = "tv";
      }
      console.log("inTheaters");
    },
    async showTrailer(showData) {
      // TODO: get the show details
      console.log(showData);
      // TODO: Get youtube keyWatch show
      try {
        let res = await axios.get(
          `http://api.themoviedb.org/3/${this.isMovieOrTv}/${showData.id}/videos?api_key=37c26238f996be5bc2090ce0085ff210`
        );
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
      // TODO: Display show Trailer
      // let url = `https://www.youtube.com/embed/`;
    },
    ontvOrTheaters(showType, id) {
      showType == "tv"
        ? `https://api.themoviedb.org/3/tv/
      ${id}/
      videos?
      api_key=37c26238f996be5bc2090ce0085ff210&language=en-US`
        : `https://api.themoviedb.org/3/tv/
      ${id}/
      videos?
      api_key=37c26238f996be5bc2090ce0085ff210&language=en-US`;
    },
    imgUrl(path) {
      return this.baseImageURL + path;
    },
  },
  created() {
    this.getData(this.inTheatersURL);
  },
};
</script>

<style lang="scss" scoped>
h1 {
  font-family: sans-serif;
  font-size: 26px;
  margin: 24px 0px 5px 20px;
}

.img {
  width: 300px;
  height: 180px;
  border-radius: 10px;
}
.slider_container {
  position: relative;
  height: 320px;
  padding: 10px;
  .slider_img_wrapper {
    position: absolute;
    top: 0px;
    left: 0px;
    height: 100%;
    width: 100%;
    background-image: linear-gradient(
      to right,
      rgba(3, 37, 65, 0.8) 0%,
      rgba(3, 37, 65, 0) 100%
    );
  }
  .slides {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transform: scale(1);
    transition: transform 0.3s ease-in-out;
    .imgcontainer {
      transition: background-image 0.5s linear;
      position: relative;
      :nth-child(2) {
        position: absolute;
        left: 56%;
        margin-left: -50px;
        top: 54%;
        margin-top: -50px;
      }
      .playicon {
        transition: transform 0.3s ease-in-out;
      }
    }
  }
  .slides:hover {
    transform: scale(1.06);
    transition: transform 0.3s ease-in-out;
    .playicon {
      transition: transform 0.3s ease-in-out;
      transform: scale(1.3);
    }
  }
}
.bg_img {
  background-position: center 25%;
  background-size: cover;
  background-repeat: no-repeat;
  color: #fff;
  transition: all 0.5s;
}

.movie_description {
  text-align: center;
  font-size: 13px;
  font-weight: 700;
  font-size: 14px;
  margin-left: 16px;
  h3,
  h4 {
    color: #fff;
  }
  h4 {
    margin-top: 3px;
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
  animation: fadeIn ease-in-out 1s;
}
.fade_out2 {
  animation: fadeIn ease-in-out 1.5s;
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
