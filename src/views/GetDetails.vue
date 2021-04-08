<template>
  <Header class="header-size" />
  <!-- Start Header -->
  <div
    class="header"
    :class="{ fadeAnimation: isLoading }"
    v-show="isLoading"
    :style="header_background_image"
  >
    <div :style="header__overlay"></div>
    <section class="header__content container">
      <div class="header__content__image">
        <img
          crossorigin="anonymous"
          ref="myImg"
          :src="imgUrl(data.poster_path)"
          :alt="`${data.name}`"
          @load="getBackDropColor()"
        />
      </div>
      <div class="header__description">
        <div class="header__description__title flex">
          <!-- for movies  -->
          <h1 v-if="data.name">{{ data.name }}</h1>
          <!-- for In Theaters  -->
          <h1 v-else>{{ data.original_title }}</h1>
          <!-- for movies  -->
          <p v-if="data.first_air_date">{{ first_air_date }}</p>
          <!--  for In Theaters  -->
          <p v-if="data.release_date">({{ release_date }})</p>
        </div>

        <div v-if="data" class="header__description__genres flex mb">
          <ul class="flex">
            <li v-for="type in data.genres" :key="type.id">{{ type.name }},</li>
          </ul>
          <h4 v-if="data.episode_run_time">
            . {{ data.episode_run_time[0] }}M
          </h4>
        </div>

        <div class="header__description__show-info">
          <h1 class="header__description__show-info__tag-line mb">
            {{ data.tagline }}
          </h1>
          <h3 class="mb-8">OverView</h3>
          <h4 class="mb">{{ data.overview }}</h4>
          <div v-if="data.created_by">
            <h3>{{ data.created_by[0] ? "Creator" : "" }}</h3>
            <h4>{{ data.created_by[0] ? data.created_by[0].name : "" }}</h4>
          </div>
        </div>
      </div>
    </section>
  </div>
  <!-- End Header -->
  <!-- Header Skeleton   -->
  <div
    class="header-skeleton"
    :class="{ fadeAnimation: isLoading }"
    v-if="!isLoading"
  >
    <svg
      class="header-skeleton__dots"
      width="132px"
      height="58px"
      viewBox="0 0 132 58"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      xmlns:sketch="http://www.bohemiancoding.com/sketch/ns"
    >
      <!-- Generator: Sketch 3.5.1 (25234) - http://www.bohemiancoding.com/sketch -->
      <title>dots</title>
      <desc>Created with Sketch.</desc>
      <defs></defs>
      <g
        id="Page-1"
        stroke="none"
        stroke-width="1"
        fill="none"
        fill-rule="evenodd"
        sketch:type="MSPage"
      >
        <g
          class="header-skeleton__dots"
          sketch:type="MSArtboardGroup"
          fill="#A3A3A3"
        >
          <circle
            id="header-skeleton__dot1"
            sketch:type="MSShapeGroup"
            cx="25"
            cy="30"
            r="13"
          ></circle>
          <circle
            class="header-skeleton__dot2"
            sketch:type="MSShapeGroup"
            cx="65"
            cy="30"
            r="13"
          ></circle>
          <circle
            class="header-skeleton__dot3"
            sketch:type="MSShapeGroup"
            cx="105"
            cy="30"
            r="13"
          ></circle>
        </g>
      </g>
    </svg>
  </div>
  <!-- End Header Skeleton -->

  <!-- Star crew -->
  <section class="container crew">
    <div class="flex-column">
      <h2 class="crew__title">Series Cast</h2>
      <!-- cast / crew -->
      <div
        v-if="data.credits"
        class="crew__cards"
        :class="{ fadeAnimation_crew: isCrewLoading }"
      >
        <ul v-if="data.credits.cast" class="crew__cards__list flex">
          <li
            v-for="(crew, i) in data.credits.cast.slice(0, 6)"
            :key="crew.credit_id"
            class="crew__cards__list_card grow-animation"
          >
            <router-link
              @click="redirect()"
              :to="`/person/${crew.credit_id}/${crewName(crew.name)}`"
            >
              <img
                v-lazyload
                width="150"
                height="250"
                class="crew__cards__list_card grow-animation"
                :alt="crew.name"
                @load="imageCastLoaded"
                :data-src="
                  seriesCastLoadedImage(crew.profile_path, data.credits.cast[i])
                "
              />
            </router-link>

            <h4>{{ crew.name }}</h4>
            <p>{{ crew.character }}</p>
          </li>
        </ul>
        <!-- crew skeleton -->
        <ul
          v-if="!data.credits"
          class="crew-skeleton"
          :class="{ fadeAnimation: isCrewLoading }"
        >
          <li v-for="(item, i) in 6" :key="i">
            <svg
              role="img"
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
          </li>
        </ul>
      </div>
      <!-- Media -->
      <div class="media">
        <div class="media__description">
          <h3>Media</h3>
          <ul>
            <li class="active_li" @click="getMedia($event, 'backdrops')">
              Backdrops
            </li>
            <li @click="getMedia($event, 'posters')">Posters</li>
            <li @click="getMedia($event, 'viedos')">Videos</li>
          </ul>
        </div>
        <div class="media__content">
          <ul>
            <li
              v-show="!isViedosCliced"
              v-for="(image, i) in mediaData"
              :key="i"
            >
              <img
                v-lazyload
                width="200"
                height="200"
                :data-src="imgUrl(image.file_path)"
                :alt="imgUrl(image.file_path)"
              />
            </li>
            <li v-show="isViedosCliced" v-for="(viedo, i) in viedos" :key="i">
              <iframe
                width="560"
                height="280"
                :src="baseIViedoURL + viedo.key"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </li>
          </ul>
        </div>
      </div>
      <Recommendations :showId="Number(showID)" :showType="showType" />
    </div>
    <!-- End crew -->

    <!-- Start side bar  -->
    <div v-if="data" class="side-bar">
      <div class="social-icons">
        <a href="#"><img src="../assets/facebook.png" alt="facebookicon"/></a>
        <a href="#"><img src="../assets/instagram.png" alt="instagramicon"/></a>
        <a href="#"><img src="../assets/twitter.png" alt="twittericon"/></a>
        <a href="#"><img src="../assets/network.png" alt="networkicon"/></a>
      </div>
      <h4>Facts</h4>
      <h4>Status</h4>
      <p>{{ data.status }}</p>
      <div v-if="data.networks">
        <h4>Network</h4>
        <ul>
          <li v-for="network in data.networks" :key="network.id">
            <img class="img-width" :src="baseImageURL + network.logo_path" />
          </li>
        </ul>
      </div>
      <div v-if="data.type">
        <h4>Type</h4>
        <p>{{ data.type }}</p>
      </div>
      <div v-if="data.budget">
        <h4>Budget</h4>
        <p>
          <b>{{ Number(data.budget).toLocaleString() }}$</b>
        </p>
      </div>

      <div v-if="data.revenue">
        <h4>Revenue</h4>
        <p>
          <b>{{ Number(data.revenue).toLocaleString() }}$</b>
        </p>
      </div>
      <div>
        <h4 v-if="data.spoken_languages">Original Language</h4>
        <ul class="langs flex">
          <li v-for="lang in data.spoken_languages" :key="lang.id">
            {{ lang.name + "," }}
          </li>
        </ul>
      </div>
      <!-- keywords -->
      <div v-if="data.keywords" class="keywords">
        <h4>
          Keywords
        </h4>

        <ul v-if="data.keywords.results || data.keywords.keywords">
          <li
            v-for="keyword in data.keywords.results
              ? data.keywords.results
              : data.keywords.keywords"
            :key="keyword.id"
          >
            <a href="#">{{ keyword.name }}</a>
          </li>
        </ul>
        <p
          v-if="
            data.keywords.results
              ? !data.keywords.results.length
              : data.keywords.keywords
              ? !data.keywords.keywords.length
              : ''
          "
        >
          No Keywords Found
        </p>
      </div>
    </div>
    <!-- End side bar  -->
  </section>
  <Footer />
</template>

<script>
import Recommendations from "@/components/Recommendations.vue";
import ColorThief from "colorthief";
import axios from "axios";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
export default {
  components: {
    Recommendations,
    Header,
    Footer,
  },
  data() {
    return {
      showID: 0,
      showType: "",
      isLoading: false,
      baseImageURL: "https://image.tmdb.org/t/p/w500/",
      baseIViedoURL: "https://www.youtube.com/embed/",
      data: {},
      header_background_image: {
        backgroundImage: "",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: " right -200px top",
      },
      header__overlay: {
        position: "absolute",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        backgroundImage: "",
      },
      mediaData: {},
      viedos: {},
      isViedosCliced: false,
      isCrewLoading: false,
    };
  },

  methods: {
    getData(URL) {
      axios
        .get(URL)
        .then(({ data }) => {
          this.data = data;
          this.header_background_image.backgroundImage = `url(${this.baseImageURL}${data.backdrop_path})`;
          this.mediaData = data.images.backdrops;
          this.viedos = data.videos.results;
          console.log(data);
          this.$progress.finish();
        })
        .catch((err) => {
          // this.$router.push({ name: "notfound" });
          console.error(err);
          // return;
        });
    },
    getBackDropColor() {
      const colorThief = new ColorThief();
      const img = this.$refs.myImg;
      const result = colorThief.getColor(img);
      this.header__overlay.backgroundImage = `linear-gradient(
     to right,
      rgba(${result[0]}, ${result[1]},${result[2]}, 1.00) 150px,
      rgba(${result[0]}, ${result[1]},${result[2]}, 0.78) 100%
    )`;
      this.isLoading = true;
      console.log(result);
    },

    seriesCastLoadedImage(url, gender) {
      if (gender.profile_path) {
        return this.imgUrl(url);
      }
      if (!gender.profile_path) {
        if (gender.gender == 1) {
          return "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg";
        } else {
          return "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-36-user-female-grey-d9222f16ec16a33ed5e2c9bbdca07a4c48db14008bbebbabced8f8ed1fa2ad59.svg";
        }
      }
    },
    getMedia(e, mediaType) {
      // TODO: 👇 Add more comments to explain this code 👇
      // Add dynamic class on click
      for (let i = 0; i < e.path[1].childNodes.length; i++) {
        if (e.path[1].childNodes[i].className == "active_li") {
          e.path[1].childNodes[i].className = "";
        }
      }
      e.target.className += "active_li";
      // Filter media based on media type
      if (mediaType == "posters") {
        this.mediaData = this.data.images.posters;
        this.isViedosCliced = false;
      }
      if (mediaType == "backdrops") {
        this.mediaData = this.data.images.backdrops;
        this.isViedosCliced = false;
      }

      if (mediaType == "viedos") {
        this.isViedosCliced = true;
        console.log("worked");
      }
    },
    imageCastLoaded() {
      this.isCrewLoading = true;
    },
    imgUrl(path) {
      return this.baseImageURL + path;
    },
    crewName(name) {
      return name.replace(/ /g, "");
    },
  },
  created() {
    this.showID = this.$route.params.id;
    this.showType = this.$route.params.type;
    let appendToResponse = "&append_to_response=videos,images,credits,keywords"; // add endpoints to get more data from the request
    let URL = `${process.env.VUE_APP_API_ROOT_URL}/${this.showType}/${this.showID}
    ?api_key=${process.env.VUE_APP_API_KEY}${appendToResponse}`;
    this.getData(URL);
  },
  computed: {
    release_date() {
      return this.data.release_date.split("-")[0];
    },
    first_air_date() {
      return this.data.first_air_date.split("-")[0];
    },
  },
};
</script>

<style lang="scss" scoped>
.header-size {
  height: 70px !important;
}
.test {
  background: #000;
}
.header-skeleton {
  background: rgb(202, 202, 202);
  svg {
    margin: auto;
    display: flex;
    height: 450px;
  }

  .header-skeleton__dots .header-skeleton__dot1 {
    animation: load 1s infinite;
  }

  .header-skeleton__dots .header-skeleton__dot2 {
    animation: load 1s infinite;
    animation-delay: 0.2s;
  }

  .header-skeleton__dots .header-skeleton__dot3 {
    animation: load 1s infinite;
    animation-delay: 0.4s;
  }

  @keyframes load {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
}
.fadeAnimation {
  animation: fadeAnimation 1s ease-in;
}
.fadeAnimation_crew {
  animation: fadeAnimation 1.9s ease-in;
}
@keyframes fadeAnimation {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0.5;
  }

  100% {
    opacity: 1;
  }
}
.flex {
  display: flex;
}
.flex-column {
  display: flex;
  flex-direction: column;
}
.mb {
  margin-bottom: 30px;
}
.mb-8 {
  margin-bottom: 8px;
}
.mt {
  margin-top: 10px;
}

.header {
  width: 100%;
  position: relative;
  height: 540px;

  .header__content {
    display: grid;
    margin-top: 50px;
    padding: 30px;
    grid-template-columns: 350px 1fr;

    .header__content__image {
      z-index: 1;
      img {
        border-radius: 10px;
        height: 450px;
      }
    }
  }

  .header__description {
    z-index: 1;
    color: white;
    display: flex;
    flex-direction: column;
    padding-top: 50px;
    .header__description__title {
      h1 {
        font-size: 28px;
      }
      margin-bottom: 8px;
      p {
        display: flex;
        align-items: center;
        padding-left: 5px;
        color: #c9c9cb;
      }
    }
    .header__description__genres {
      ul li:last-child {
        padding-right: 5px;
      }
    }
  }
  .header__description__show-info__tag-line {
    font-size: 18px;
    font-weight: 600;
    font-style: italic;
    opacity: 0.7;
  }
}

// Series Cast
.crew {
  display: grid;
  grid-template-columns: 3fr 1fr;

  .crew__title {
    margin: 20px 0px 10px 8px;
  }

  .crew__cards {
    overflow: auto;
    white-space: nowrap;
    .crew-skeleton {
      display: flex;
      padding: 10px;
      width: 120px; // set it to any width(no-effect) but not 100%
      svg {
        width: 300px;
        height: 100%;
      }
      li {
        white-space: break-spaces;
        display: flex;
      }
    }
    .crew__cards__list {
      width: 400px; // set it to any width(no-effect) but not 100%
      height: 300px;
      .crew__cards__list_card {
        white-space: break-spaces;
        display: flex;
        flex-direction: column;
        margin: 5px;
        border-radius: 15px;
        box-shadow: 0 4px 8px 0 #ccc;
        padding: 5px;
      }
      img {
        border-top-left-radius: 15px;
        border-top-right-radius: 15px;
        height: 190px;
        width: 150px;
      }
      h4 {
        margin: 5px 0px 5px 0px;
      }
    }
  }

  .media {
    margin-bottom: 100px;
    margin-top: 100px;
    .media__description {
      display: grid;
      grid-template-columns: 1fr 2fr;
      width: 700px;
      h3 {
        align-self: center;
      }
      ul {
        display: flex;
        justify-content: space-around;
        li {
          cursor: pointer;
          padding: 10px;
          height: 50px;
        }
      }
    }
    .active_li {
      border-bottom: 4px solid #ddd;
    }
    .media__content {
      width: 700px;
      height: 200px;

      ul {
        display: flex;
        overflow: auto;

        li {
          margin: 15px 6px 10px 0px;
          border-radius: 20px;
          box-shadow: 6px 6px 14px 0 rgba(0, 0, 0, 0.2),
            -8px -8px 18px 0 hsla(0, 0%, 100%, 0.55);
          padding: 10px;
          img {
            border-radius: 20px;
            width: 280px;
            height: 244px;
          }
        }
      }
    }
  }

  .side-bar {
    display: flex;
    flex-direction: column;
    padding-left: 35px;
    // padding-top: 10px;
    h4 {
      margin-top: 15px;
    }
    .social-icons {
      display: flex;
      a {
        margin-top: 38px;
        padding: 5px;
        img {
          width: 30px;
          height: 30px;
        }
      }
    }
    .img-width {
      width: 40%;
      // height: 60%;
    }
    .langs {
      flex-wrap: wrap;
    }
    .keywords {
      h4 {
        margin-bottom: 8px;
      }
      ul {
        display: flex;
        flex-wrap: wrap;
        li {
          margin-right: 5px;
          margin-bottom: 7px;
          background-color: rgba(0, 0, 0, 0.1);
          border: 1px solid #d7d7d7;
          color: #000;
          padding: 4px 10px;
          border-radius: 4px;
        }
      }
    }
  }
}
</style>
