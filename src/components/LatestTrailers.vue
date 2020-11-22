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
          <h3 :class="{ switch_text_color: !isSwitch }">Shows</h3>
        </div>
      </div>
    </div>

    <!--  placeholder lib-->
    <swiper
      :slides-per-view="4"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
      class="slider_container"
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
          <img src="../assets/playicon.png" alt="play icon" class="playIcon" />
        </div>
        <div class="movie_description " v-if="data.results">
          <h3 v-text="movie.title ? movie.title : movie.name"></h3>
          <!-- <h4 v-text="handleOverviewText(movie.overview)"></h4> -->
        </div>
      </swiper-slide>
      <swiper-slide class="slides" v-for="item in 4" :Key="item">
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
      trailersData: {},
      onTvURl:
        "https://api.themoviedb.org/3/movie/popular?api_key=37c26238f996be5bc2090ce0085ff210&language=en-US&page=1",
      inTheatersURL:
        "https://api.themoviedb.org/3/tv/popular?api_key=37c26238f996be5bc2090ce0085ff210&language=en-US&page=1",
      onTvlatestTrailers:
        "https://api.themoviedb.org/3/tv/{tv_id}/videos?api_key=37c26238f996be5bc2090ce0085ff210&language=en-US",
      inTheaterslatestTrailers:
        "https://api.themoviedb.org/3/movie/{movie_id}/videos?api_key=37c26238f996be5bc2090ce0085ff210&language=en-US",
      isActive: true,
      isSwitch: true,
      fade: false,
      fade2: true,
      sliderBG: {
        backgroundImage: "",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        transition: "background-image 0.5s linear",
      },

      placeholderBG: {
        backgroundImage:
          "linear-gradient(to right, rgba(3, 37, 65, 0.8) 0%, rgb(3 37 65 / 22%) 100%)",
      },
    };
  },
  methods: {
    onSwiper(swiper) {
      console.log(swiper);
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
    handleOverviewText(text) {
      return text.substring(0, 95);
    },

    changeBackgroundImage(imgPATH) {
      this.sliderBG.backgroundImage = `linear-gradient(
        to right,
        rgba(3, 37, 65, 0.8) 0%,
        rgba(3, 37, 65, 0) 100%
      ),url(${imgPATH})`;
      console.log(this.sliderBG.backgroundImage);
    },
    async onTv() {
      console.log("On TV");
      if (!this.isActive && !this.isSwitch) {
        this.fade = false;
        this.fade2 = false;
        this.isActive = true;
        this.isSwitch = true;
        this.getData(this.inTheatersURL);
      }
    },
    async inTheaters() {
      if (this.isActive && this.isSwitch) {
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
.slider_container {
  height: 320px;
  padding: 10px;
}
h1 {
  font-family: sans-serif;
  font-size: 26px;
  margin: 24px 0px 5px 20px;
}

.img {
  width: 300px;
  height: 230px;
  border-radius: 10px;
}

.slides {
  transition: all 0.5s;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .imgcontainer {
    position: relative;

    :nth-child(2) {
      position: absolute;
      left: 56%;
      margin-left: -50px;
      top: 54%;
      margin-top: -50px;
    }
    img {
      transform: scale(1);
      transition: transform 0.4s ease-out;
    }
    img:hover {
      transform: scale(1.1);
      transition: transform 0.4s ease-out;
    }
  }
}
@keyframes zoominoutsinglefeatured {
  0% {
    transform: scale(1, 1);
  }
  50% {
    transform: scale(1.2, 1.2);
  }
  100% {
    transform: scale(1, 1);
  }
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

  .img:hover {
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
