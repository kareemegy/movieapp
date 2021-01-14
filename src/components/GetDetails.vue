<template>
  <div
    class="full_contianer"
    :class="{ fade: isLoading }"
    v-show="isLoading"
    :style="sliderBG"
  >
    <div :style="layer"></div>
    <section class="container">
      <div>
        <img
          crossorigin="anonymous"
          ref="myImg"
          :src="`${baseImageURL}${data.poster_path}`"
          :alt="`${data.name}`"
          @load="getBackDropColor()"
        />
      </div>
      <div class="show_description">
        <div class="show_description_title flex">
          <!-- for movies  -->
          <h1 v-if="data.name">{{ data.name }}</h1>
          <!-- for In Theaters  -->
          <h1 v-else>{{ data.original_title }}</h1>
          <!-- for movies  -->
          <p v-if="data.first_air_date">{{ first_air_date }}</p>
          <!--  for In Theaters  -->
          <p v-if="data.release_date">({{ release_date }})</p>
        </div>

        <div v-if="data" class="show_description_type flex mb">
          <ul class="genres flex">
            <li v-for="type in data.genres" :key="type.id">{{ type.name }},</li>
          </ul>
          <h4 v-if="data.episode_run_time">
            . {{ data.episode_run_time[0] }}M
          </h4>
        </div>

        <div class="movie_info">
          <h1 class="tag_line mb">{{ data.tagline }}</h1>
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
  <!-- header  placeholder loader  -->
  <div class="placeholder" :class="{ fade: isLoading }" v-if="!isLoading">
    <svg
      id="dots"
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
        <g id="dots" sketch:type="MSArtboardGroup" fill="#A3A3A3">
          <circle
            id="dot1"
            sketch:type="MSShapeGroup"
            cx="25"
            cy="30"
            r="13"
          ></circle>
          <circle
            id="dot2"
            sketch:type="MSShapeGroup"
            cx="65"
            cy="30"
            r="13"
          ></circle>
          <circle
            id="dot3"
            sketch:type="MSShapeGroup"
            cx="105"
            cy="30"
            r="13"
          ></circle>
        </g>
      </g>
    </svg>
  </div>
  <!-- Series Cast -->
  <section class="container series_cast">
    <div class="col-1">
      <h2 class="section_h2">Series Cast</h2>
      <!-- cast / crew -->
      <div class="section_cast_box">
        <ul
          v-if="data.credits"
          :class="{ fade: isCastLoading }"
          class="section_cast_box_crew_box"
        >
          <li
            v-for="(crew, i) in data.credits.cast.slice(0, 6)"
            :key="crew.credit_id"
          >
            <img
              :src="
                seriesCastLoadedImage(
                  baseImageURL + crew.profile_path,
                  data.credits.cast[i]
                )
              "
              :alt="crew.name"
              @load="imageCastLoaded"
            />
            <h4>{{ crew.name }}</h4>
            <p>{{ crew.character }}</p>
          </li>
        </ul>
        <!-- placeholder boxs -->
        <ul
          v-if="!data.credits"
          class="placeholder_boxs"
          :class="{ fade: isCastLoading }"
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
        <div class="col-1">
          <h3>Media</h3>
          <ul>
            <li class="active_li" @click="getMedia($event, 'backdrops')">
              Backdrops
            </li>
            <li @click="getMedia($event, 'posters')">Posters</li>
            <li @click="getMedia($event, 'viedos')">Videos</li>
          </ul>
        </div>
        <div class="media_content">
          <ul>
            <li
              v-show="!isViedosCliced"
              v-for="(image, i) in mediaData"
              :key="i"
            >
              <img :src="baseImageURL + image.file_path" alt="" srcset="" />
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
    <!-- show general ifo -->
    <div v-if="data" class="col-2">
      <div class="social_icons">
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
            <img class="network_img" :src="baseImageURL + network.logo_path" />
          </li>
        </ul>
      </div>
      <div v-if="data.type">
        <h4>Type</h4>
        <p>{{ data.type }}</p>
      </div>
      <div v-if="data.budget">
        <h4>Budget</h4>
        <p>${{ data.budget }}</p>
      </div>

      <div v-if="data.revenue">
        <h4>Revenue</h4>
        <p>${{ data.revenue }}</p>
      </div>
      <div>
        <h4 v-if="data.spoken_languages">Original Language</h4>
        <ul class="langs">
          <li v-for="lang in data.spoken_languages" :key="lang.id">
            {{ lang.name + "," }}
          </li>
        </ul>
      </div>
      <!-- keywords -->
      <div v-if="data" class="keywords">
        <h4 v-if="data.results || data.keywords">
          Keywords
        </h4>
        <ul v-if="data.results">
          <li v-for="keyword in data.results" :key="keyword.id">
            <a href="#">{{ keyword.name }}</a>
          </li>
        </ul>
        <ul v-if="data.keywords">
          <li v-for="keyword in data.keywords" :key="keyword.id">
            <a href="#">{{ keyword.name }}</a>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import Recommendations from "@/components/Recommendations.vue";
import ColorThief from "colorthief";
import axios from "axios";
export default {
  components: {
    Recommendations,
  },
  data() {
    return {
      showID: 0,
      showType: "",
      isLoading: false,
      baseImageURL: "https://image.tmdb.org/t/p/w500/",
      baseIViedoURL: "https://www.youtube.com/embed/",
      data: {},
      sliderBG: {
        backgroundImage: "",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: " right -200px top",
      },
      layer: {
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
      isCastLoading: false,
    };
  },

  methods: {
    getData(URL) {
      axios
        .get(URL)
        .then(({ data }) => {
          this.data = data;
          this.sliderBG.backgroundImage = `url(${this.baseImageURL}${data.backdrop_path})`;
          this.mediaData = data.images.backdrops;
          this.viedos = data.videos.results;
          console.log(data);
          this.$progress.finish();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getBackDropColor() {
      const colorThief = new ColorThief();
      const img = this.$refs.myImg;
      const result = colorThief.getColor(img);

      this.layer.backgroundImage = `linear-gradient(
     to right,
      rgba(${result[0]}, ${result[1]},${result[2]}, 1.00) 150px,
      rgba(${result[0]}, ${result[1]},${result[2]}, 0.78) 100%
    )`;
      this.isLoading = true;
      console.log(result);
    },

    seriesCastLoadedImage(image_url, gender) {
      if (gender.profile_path) {
        return image_url;
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
      this.isCastLoading = true;
    },
  },
  created() {
    this.showID = this.$route.params.id;
    this.showType = this.$route.params.type;
    let appendToResponse = "&append_to_response=videos,images,credits"; // add endpoints to get more data from the request
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
.test {
  background: #000;
}
* {
  // FIXME: remove it and fix the header bug
  z-index: -1;
}
.placeholder {
  background: rgb(202, 202, 202);
  svg {
    margin: auto;
    display: flex;
    height: 450px;
  }

  #dots #dot1 {
    animation: load 1s infinite;
  }

  #dots #dot2 {
    animation: load 1s infinite;
    animation-delay: 0.2s;
  }

  #dots #dot3 {
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
.fade {
  animation: fade 1s ease-in-out;
  @keyframes fade {
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
}
.flex {
  display: flex;
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

.full_contianer {
  width: 100%;
  position: relative;
  height: 540px;

  section {
    display: grid;
    margin-top: 50px;
    padding: 30px;
    li {
      list-style: none;
    }
    grid-template-columns: 350px 1fr;
    img {
      border-radius: 10px;
      height: 450px;
    }
  }

  .show_description {
    color: white;
    display: flex;
    flex-direction: column;
    padding-top: 50px;
    .show_description_title {
      margin-bottom: 8px;

      p {
        display: flex;
        align-items: center;
        padding-left: 5px;
        color: #c9c9cb;
      }
    }
    .show_description_type {
      .genres li:last-child {
        padding-right: 5px;
      }
    }
  }
  .movie_info {
    .tag_line {
      font-size: 18px;
      font-weight: 400;
      font-style: italic;
      opacity: 0.7;
    }
  }
}

// Series Cast
.series_cast {
  display: grid;
  grid-template-columns: 3fr 1fr;
  .col-1 {
    z-index: 11111 !important;
    display: flex;
    flex-direction: column;
    .section_h2 {
      margin: 20px 0px 10px 8px;
    }

    .section_cast_box {
      overflow: auto;
      white-space: nowrap;
      .placeholder_boxs {
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
      .section_cast_box_crew_box {
        display: flex;
        width: 400px; // set it to any width(no-effect) but not 100%
        height: 300px;
        & li {
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
      .col-1 {
        display: grid;
        grid-template-columns: 1fr 2fr;
        width: 700px;
        h3 {
          align-self: center;
        }
        ul {
          z-index: 555555 !important;
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
      .media_content {
        width: 700px;
        height: 200px;

        ul {
          display: flex;
          overflow: auto;
          z-index: 5555 !important;

          li {
            z-index: 5555 !important;
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
  }
  .col-2 {
    display: flex;
    flex-direction: column;
    padding-left: 35px;
    // padding-top: 10px;
    h4 {
      margin-top: 15px;
    }
    .social_icons {
      display: flex;
      // justify-content: center;
      a {
        margin-top: 38px;
        padding: 5px;
        img {
          width: 30px;
          height: 30px;
        }
      }
    }
    .network_img {
      width: 40%;
      // height: 60%;
    }
    .langs {
      display: flex;
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
