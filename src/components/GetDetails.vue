<template>
  <div class="full_contianer" v-if="data" :style="sliderBG">
    <div :style="layer"></div>
    <section class="container">
      <img
        crossorigin="anonymous"
        ref="myImg"
        :src="`${baseImageURL}${data.poster_path}`"
        :alt="`${data.name}`"
        @load="getBackDropColor()"
      />
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
  <!-- Series Cast -->
  <section class="container series_cast">
    <div v-if="data.credits" class="col-1">
      <h2 class="section_h2">Series Cast</h2>
      <div class="section_cast_box">
        <ul class="section_cast_box_crew_box">
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
            />
            <h4>{{ crew.name }}</h4>
            <p>{{ crew.character }}</p>
          </li>
        </ul>
      </div>
      <div class="media">
        <div class="col-1">
          <h3>Media</h3>
          <ul>
            <li class="active_li" @click="getMedia($event,'backdrops')">Backdrops</li>
            <li @click="getMedia($event,'posters')">Posters</li>
            <li @click="getMedia($event,'videos')">Videos</li>
          </ul>
        </div>
        <div class="media_content">
          <ul>
            <li v-for="(image, i) in mediaData" :key="i">
              <img :src="baseImageURL + image.file_path" alt="" srcset="" />
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
      baseImageURL: "https://image.tmdb.org/t/p/w500/",
      baseIViedoURL: " https://www.youtube.com/watch?v=",
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
          console.log(data);
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

      // TODO: Filter the media based on media click
      if (mediaType == "posters") {
        this.mediaData = this.data.images.posters;
      }
      if (mediaType == "backdrops") {
        this.mediaData = this.data.images.backdrops;
      }
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
* {
  // FIXME: remove it and fiz the header bug
  z-index: -1;
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
        h3{
          align-self: center;
        }
        ul {
          z-index: 555555 !important;
          display: flex;
          justify-content: space-around;
          li {
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
