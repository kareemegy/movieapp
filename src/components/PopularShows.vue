<template>
  <div class="mb">
    <div class="d-flex">
      <h1>What's popular</h1>
      <div class="switcher">
        <div class="switcher__ontv" @click="onTv()">
          <h3 :class="{ text_active: !toggle }">On TV</h3>
          <span
            class="active"
            :class="{
              active_left: isActiveLeft,
              active_right: isActiveRight,
            }"
          ></span>
        </div>
        <div @click="inTheaters" class="switcher__intheaters">
          <h3 :class="{ text_active: toggle }">In Theaters</h3>
        </div>
      </div>
    </div>
    <!--  placeholder lib-->
    <swiper
      class="swiper"
      ref="swiper"
      :options="swiperOption"
      :slides-per-view="9"
      :autoplay="true"
      :pagination="{ clickable: true }"
      @swiper="onSwiper"
      :class="{
        fade_out_toggle: fade,
      }"
    >
      <swiper-slide
        class="swiper__slides grow-animation "
        id="slider_main"
        :class="{
          fade_out: !fade2,
          fade_out: data.results,
        }"
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
            width="150"
            height="250"
            class="swiper__slides__img fade_out"
            @load="isLoaded"
            :data-src="imgUrl(movie.poster_path)"
            :alt="movie.title ? movie.title : movie.name"
          />
        </router-link>
        <div class="swiper__slides__description fade_out">
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
      <!-- place holder swiper__slides -->
      <swiper-slide
        class="swiper__slide"
        id="placeholder"
        v-for="item in 10"
        :Key="item"
        v-show="!data.results"
      >
        <svg
          v-if="!isImageLoaded"
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
import axios from "axios";
export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      baseImageURL: "https://image.tmdb.org/t/p/w500/",
      showType: "tv",
      data: {},
      isActiveLeft: false,
      isActiveRight: false,
      fade: false,
      fade2: true,
      swiperOption: { autoplay: true },
      swiper: {},
      isImgsLoaded: false,
      toggle: false,
      isImageLoaded: false,
    };
  },
  methods: {
    onSwiper(swiper) {
      this.swiper = swiper;
    },
    isLoaded() {
      this.isImageLoaded = true;
    },
    imgUrl(path) {
      return this.baseImageURL + path;
    },
    onSlideChange() {
      // console.log(swiper.activeIndex);
    },

    imgLoad() {
      this.isImgsLoaded = true;
    },
    async getData(URL) {
      try {
        let { data } = await axios.get(URL);
        this.data = data;
      } catch (err) {
        console.error(err);
      }
    },
    onTv() {
      this.swiper.slideTo(0, 0);
      if (this.toggle) {
        this.showType = "tv";
        console.log(this.swiper);
        this.fade = false;
        this.fade2 = false;
        this.isActiveRight = false;
        this.isActiveLeft = true;
        this.toggle = !this.toggle;
        this.getData(
          `${process.env.VUE_APP_API_ROOT_URL}/tv/popular?api_key=${process.env.VUE_APP_API_KEY}&language=en-US&page=1`
        );
      }
    },
    inTheaters() {
      this.swiper.slideTo(0, 0);
      if (!this.toggle) {
        this.showType = "movie";
        this.fade = true;
        this.fade2 = true;
        this.isActiveLeft = false;
        this.isActiveRight = true;
        this.toggle = !this.toggle;

        this.getData(
          `${process.env.VUE_APP_API_ROOT_URL}/movie/popular?api_key=${process.env.VUE_APP_API_KEY}&language=en-US&page=1`
        );
      }
    },
    redirect() {
      this.$progress.start();
    },
  },
  created() {
    this.getData(
      `${process.env.VUE_APP_API_ROOT_URL}/tv/popular?api_key=${process.env.VUE_APP_API_KEY}&language=en-US&page=1`
    );
  },
};
</script>

<style lang="scss" scoped>
.mb {
  margin-bottom: 50px;
}
.d-flex {
  display: flex;
}
.hidden {
  visibility: hidden;
}
.visible {
  visibility: visible;
}
.switcher {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 150px;
  border-radius: 10px;
  border: 1px solid #032541;
  margin-top: 24px;
  height: 35px;
  margin-left: 11px;
  font-size: 15px;
  height: 28px;
  div,
  h3 {
    height: 100%;
  }
  h3 {
    display: flex;
    align-items: center;
    color: #032541;
    cursor: pointer;
  }
  .switcher__ontv {
    position: relative;
    width: 60px;
    padding-left: 3px;
  }
  .switcher__intheaters {
    padding-right: 3px;
  }
  .active_right {
    left: 70px;
    width: 79px;
  }
  .active_left {
    left: 0px;
    width: 60px;
  }
}
.active {
  position: absolute;
  border-radius: 10px;
  border: 1px solid #032541;
  z-index: -1;
  top: 0px;
  left: 0px;
  bottom: 0px;
  width: 60px;
  background: #032541;
  transition: left 0.5s ease-in, width 0.5s ease-in;
}
.text_active {
  background-image: linear-gradient(
    to right,
    rgba(192, 254, 207, 1) 0%,
    rgba(30, 213, 169, 1) 100%
  );
  transition: background-image 0.1s ease-in 0.4s;
  background-size: 100%;
  background-repeat: repeat;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-background-clip: text;
  -moz-text-fill-color: transparent;
}
.hide {
  display: none;
}

h1 {
  font-size: 22px;
  font-weight: 600;
  margin: 24px 0px 5px 20px;
}
.swiper__slides__img {
  // width: 150px;
  // height: 250px;
  border-radius: 20px;
  padding: 8px;
}

.swiper__slides {
  height: 354px;
  width: auto;
}

.swiper__slides__description {
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

.fade_out {
  animation: fadeIn ease-in 1.8s;
}
.fade_out_toggle {
  animation: fadeIn ease-in 1.3s;
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
