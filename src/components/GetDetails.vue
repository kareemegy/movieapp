<template>
  <div class="full_contianer" v-if="data[0]" :style="sliderBG">
    <div class="layer"></div>
    <section class="container">
      <img
        ref="myImg"
        :src="`${baseImageURL}${data[0].poster_path}`"
        :alt="`${data[0].name}`"
      />
      <div class="show_description">
        <div class="show_description_title flex">
          <!-- for movies  -->
          <h1 v-if="data[0].name">{{ data[0].name }}</h1>
          <!-- for In Theaters  -->
          <h1 v-else>{{ data[0].original_title }}</h1>
          <!-- for movies  -->
          <p v-if="data[0].first_air_date">
            ({{ data[0].first_air_date.split("-")[0] }})
          </p>
          <!--  for In Theaters  -->
          <p v-else>({{ data[0].release_date.split("-")[0] }})</p>
        </div>
        <div class="show_description_type flex mb">
          <ul class="genres flex">
            <li v-for="(type, index) in data[0].genres" :key="index">
              {{ type.name }},
            </li>
          </ul>
          <h4>. {{ data[0].episode_run_time[0] }}M</h4>
        </div>
        <div class="movie_info">
          <h1 class="tag_line mb">{{ data[0].tagline }}</h1>
          <h3 class="mb-8">OverView</h3>
          <h4 class="mb">{{ data[0].overview }}</h4>
          <h3>Creator</h3>
          <h4>{{ data[0].created_by[0].name }}</h4>
        </div>
      </div>
    </section>
  </div>
  <!-- Series Cast -->
  <section v-if="data[1]" class="container series_cast">
    <div class="col-1">
      <h2 class="section_h2">Series Cast</h2>
      <div class="section_cast_box">
        <ul class="section_cast_box_crew_box">
          <li v-for="crew in data[1].cast" :key="crew.credit_id">
            <img :src="baseImageURL + crew.profile_path" :alt="crew.name" />
            <h4>{{ crew.name }}</h4>
            <p>{{ crew.character }}</p>
          </li>
        </ul>
      </div>
    </div>
    <div v-if="data[0]" class="col-2">
      <div class="social_icons">
        <a href="#"><img src="../assets/facebook.png" alt="facebookicon"/></a>
        <a href="#"><img src="../assets/instagram.png" alt="instagramicon"/></a>
        <a href="#"><img src="../assets/twitter.png" alt="twittericon"/></a>
        <a href="#"><img src="../assets/network.png" alt="networkicon"/></a>
      </div>
      <h4>Facts</h4>
      <h4>Status</h4>
      <p>{{ data[0].status }}</p>
      <h4>Network</h4>
      <ul>
        <li v-for="network in data[0].networks" :key="network.id">
          <img class="network_img" :src="baseImageURL + network.logo_path" />
        </li>
      </ul>

      <h4>Type</h4>
      <p>{{ data[0].type }}</p>
      <h4>Original Language</h4>
      <ul class="langs" v-if="data[0].spoken_languages">
        <li v-for="lang in data[0].spoken_languages" :key="lang.id">
          {{ lang.name + "," }}
        </li>
      </ul>
      <div v-if="data[2]" class="keywords">
        <h4>Keywords</h4>
        <ul>
          <li v-for="keyword in data[2].results" :key="keyword.id">
            <a href="#">{{ keyword.name }}</a>
          </li>
        </ul>
      </div>
      <!-- {{process.env.VUE_APP_FOO}} -->
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      showID: 0,
      showType: "",
      api_key: "37c26238f996be5bc2090ce0085ff210&language=en-US",
      baseImageURL: "https://image.tmdb.org/t/p/w500/",
      baseIViedoURL: " https://www.youtube.com/watch?v=",
      data: {},
      sliderBG: {
        backgroundImage: "",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: " right -200px top",
      },
    };
  },

  methods: {
    async getData(showsURL, seriescastURL, keywordsURL) {
      try {
        let urls = [showsURL, seriescastURL, keywordsURL];

        Promise.all(
          urls.map((url) => fetch(url).then((res) => res.json()))
        ).then((data) => {
          this.data = data;
          this.sliderBG.backgroundImage = `
              url(${this.baseImageURL}${data[0].backdrop_path})`;
          console.log(this.data);
        });
      } catch (error) {
        console.error(error);
      }
    },
    getBackDropColor() {
      
    },
  },
  created() {
    this.showID = this.$route.params.id;
    this.showType = this.$route.params.type;
    let URLS = [
      `https://api.themoviedb.org/3/${this.showType}/${this.showID}?api_key=${this.api_key}`,
      `http://api.themoviedb.org/3/tv/${this.showID}/credits?api_key=${this.api_key}`,
      `https://api.themoviedb.org/3/${this.showType}/${this.showID}/keywords?api_key=${this.api_key}`,
    ];
    this.getData(...URLS);
  },
  mounted(){
  }
};
</script>

<style lang="scss" scoped>
* {
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
  .layer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(
      to right,
      rgba(3.53%, 7.45%, 12.94%, 1) 150px,
      rgba(3.53%, 7.45%, 12.94%, 0.84) 100%
    );
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
          display: flex;
          flex-direction: column;
          margin: 5px;
          height: 280px;
          width: 280px;
          border-radius: 15px;
          box-shadow: 0 4px 8px 0 #ccc;
          padding: 5px;
        }

        img {
          border-top-left-radius: 15px;
          border-top-right-radius: 15px;
          height: 190px;
        }
        h4 {
          margin: 5px 0px 5px 0px;
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
      width: 20%;
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
