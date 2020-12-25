<template>
  <div class="full_contianer" v-if="data" :style="sliderBG">
    <div class="layer"></div>
    <section class="container">
      <img
        ref="myImg"
        :src="`${baseImageURL}${data.poster_path}`"
        :alt="`${data.name}`"
      />
      <div class="show_description">
        <div class="show_description_title flex">
          <h1>{{ data.name }}</h1>
          <p>({{ firstAirDate.split("-")[0] }})</p>
        </div>
        <div class="show_description_type flex mb">
          <ul class="genres flex">
            <li v-for="(type, index) in data.genres" :key="index">
              {{ type.name }},
            </li>
          </ul>
          <h4>. {{ episodeRunTime }}M</h4>
        </div>
        <div class="movie_info">
          <h1 class="tag_line mb">{{ data.tagline }}</h1>
          <h3 class="mb">OverView</h3>
          <h4 class="mb">{{ data.overview }}</h4>
          <h3>Creator</h3>
          <h4>{{ createdBy }}</h4>
        </div>
      </div>
    </section>
  </div>
  <!-- Series Cast -->
  <section class="container series_cast">
    <div class="col-1">
      <h2 class="section_h2">Series Cast</h2>
      <div class="section_cast_box">
        <ul class="section_cast_box_crew_box">
          <li>
            <img
              src="http://image.tmdb.org/t/p/w138_and_h175_face/lMqKPig7zBoGfou7wWf88sZEGHo.jpg"
              alt="#"
            />
            <h4>Mark Harmon</h4>
            <p>Leroy Jethro Gibbs</p>
          </li>
          <li>
            <img
              src="http://image.tmdb.org/t/p/w138_and_h175_face/lMqKPig7zBoGfou7wWf88sZEGHo.jpg"
              alt="#"
            />
            <h4>Mark Harmon</h4>
            <p>Leroy Jethro Gibbs</p>
          </li>
          <li>
            <img
              src="http://image.tmdb.org/t/p/w138_and_h175_face/lMqKPig7zBoGfou7wWf88sZEGHo.jpg"
              alt="#"
            />
            <h4>Mark Harmon</h4>
            <p>Leroy Jethro Gibbs</p>
          </li>
          <li>
            <img
              src="http://image.tmdb.org/t/p/w138_and_h175_face/lMqKPig7zBoGfou7wWf88sZEGHo.jpg"
              alt="#"
            />
            <h4>Mark Harmon</h4>
            <p>Leroy Jethro Gibbs</p>
          </li>
          <li>
            <img
              src="http://image.tmdb.org/t/p/w138_and_h175_face/lMqKPig7zBoGfou7wWf88sZEGHo.jpg"
              alt="#"
            />
            <h4>Mark Harmon</h4>
            <p>Leroy Jethro Gibbs</p>
          </li>
          <li>
            <img
              src="http://image.tmdb.org/t/p/w138_and_h175_face/lMqKPig7zBoGfou7wWf88sZEGHo.jpg"
              alt="#"
            />
            <h4>Mark Harmon</h4>
            <p>Leroy Jethro Gibbs</p>
          </li>
          <li>
            <img
              src="http://image.tmdb.org/t/p/w138_and_h175_face/lMqKPig7zBoGfou7wWf88sZEGHo.jpg"
              alt="#"
            />
            <h4>Mark Harmon</h4>
            <p>Leroy Jethro Gibbs</p>
          </li>
          <li>
            <img
              src="http://image.tmdb.org/t/p/w138_and_h175_face/lMqKPig7zBoGfou7wWf88sZEGHo.jpg"
              alt="#"
            />
            <h4>Mark Harmon</h4>
            <p>Leroy Jethro Gibbs</p>
          </li>
          <li>
            <img
              src="http://image.tmdb.org/t/p/w138_and_h175_face/lMqKPig7zBoGfou7wWf88sZEGHo.jpg"
              alt="#"
            />
            <h4>Mark Harmon</h4>
            <p>Leroy Jethro Gibbs</p>
          </li>
          <li>
            <img
              src="http://image.tmdb.org/t/p/w138_and_h175_face/lMqKPig7zBoGfou7wWf88sZEGHo.jpg"
              alt="#"
            />
            <h4>Mark Harmon</h4>
            <p>Leroy Jethro Gibbs</p>
          </li>
          <li>
            <img
              src="http://image.tmdb.org/t/p/w138_and_h175_face/lMqKPig7zBoGfou7wWf88sZEGHo.jpg"
              alt="#"
            />
            <h4>Mark Harmon</h4>
            <p>Leroy Jethro Gibbs</p>
          </li>
          <li>
            <img
              src="http://image.tmdb.org/t/p/w138_and_h175_face/lMqKPig7zBoGfou7wWf88sZEGHo.jpg"
              alt="#"
            />
            <h4>Mark Harmon</h4>
            <p>Leroy Jethro Gibbs</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="col-2">
      <div class="social_icons">
        <a href="#"><img src="../assets/facebook.png" alt="facebookicon"/></a>
        <a href="#"><img src="../assets/instagram.png" alt="instagramicon"/></a>
        <a href="#"><img src="../assets/twitter.png" alt="twittericon"/></a>
        <a href="#"><img src="../assets/network.png" alt="networkicon"/></a>
      </div>
      <h4>Facts</h4>
      <h4>Status</h4>
      <p>Returning Series</p>
      <h4>Network</h4>
      <p>Fox</p>
      <h4>Type</h4>
      <p>Scripted</p>
      <h4>Original Language</h4>
      <p>English</p>
      <div class="keywords">
        <h4>Keywords</h4>
        <ul>
          <li>
            <a href="https://www.themoviedb.org/keyword/3436-karate/tv">dojo</a>
          </li>
          <li><a href="#">action</a></li>
          <li><a href="#">drama</a></li>
          <li><a href="#">drama</a></li>
          <li><a href="#">drama</a></li>
          <li><a href="#">drama</a></li>
        </ul>
      </div>
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
      URL: "",
      data: {},
      firstAirDate: "",
      episodeRunTime: "",
      createdBy: "",
      sliderBG: {
        backgroundImage: "",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: " right -200px top",
      },
    };
  },

  methods: {
    async getData(URL) {
      try {
        let response = await fetch(URL);
        let data = await response.json();
        this.data = data;
        this.firstAirDate = this.data.first_air_date;
        this.episodeRunTime = this.data.episode_run_time[0];
        this.createdBy = data.created_by[0].name;
        this.sliderBG.backgroundImage = `
        url(${this.baseImageURL}${data.backdrop_path})`;

        // this.getBackDropColor();
      } catch (err) {
        console.error(err);
      }
    },

    getBackDropColor() {},
  },
  created() {
    this.showID = this.$route.params.id;
    this.showType = this.$route.params.type;
    this.URL = `https://api.themoviedb.org/3/${this.showType}/${this.showID}?api_key=${this.api_key}`;
    this.getData(this.URL);
  },
  mounted() {},
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
    &:nth-child(2) {
      font-size: 16px;
      color: red;
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
          width: 100%;
          border-top-left-radius: 15px;
          border-top-right-radius: 15px;
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
    .keywords {
      h4{
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
