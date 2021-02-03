<template>
  <Header />
  <div>
    <section class="search container">
      <img class="search__search-icon" src="../assets/search-icon.gif" />
      <input
        class="search__input"
        type="text"
        placeholder="Search for a movie, tv, people..."
        v-model="query"
        @focus="showXIcon($event)"
        @blur="showXIcon($event)"
        @keydown.enter="search"
      />
      <!--  :class="{ hide: !isX }" -->
      <div class="search__remove-icon-wrapper">
        <img
          @click="clearQuery"
          class="search__remove-icon"
          src="../assets/x.png"
          alt="remove icon"
        />
      </div>
    </section>
    <hr />
    <section class="container search-info">
      <div class="search-info__col-1">
        <div class="search-info__col-1__search-Results ">
          <h4 class="search-Results__title">Search Results</h4>
        </div>
        <div class="d-flex">
          <h3>TV Shows</h3>
          <span class="search-results__tag">1</span>
        </div>
        <div class="d-flex">
          <h3>Movies</h3>
          <span class="search-results__tag">3</span>
        </div>
        <div class="d-flex">
          <h3>People</h3>
          <span class="search-results__tag">4</span>
        </div>
        <div class="d-flex">
          <h3>Collections</h3>
          <span class="search-results__tag">0</span>
        </div>
        <div class="d-flex">
          <h3>Companies</h3>
          <span class="search-results__tag">0</span>
        </div>
        <div class="d-flex">
          <h3>Keywords</h3>
          <span class="search-results__tag">1</span>
        </div>
        <div class="d-flex">
          <h3>Networks</h3>
          <span class="search-results__tag">2</span>
        </div>
      </div>
      <div v-if="isLoading" class="search-info__col-2">
        <div
          class="search-info__col-2__card"
          v-for="searchInfo in data"
          :key="searchInfo.id"
        >
          <router-link
            :to="
              `/details/${searchInfo.media_type}/${searchInfo.id}/${showTitle(
                searchInfo.title
              )}`
            "
          >
            <img
              class="search-info__col-2__card__img"
              :src="imgUrl(searchInfo.backdrop_path)"
              alt="img"
              @error="imgPlaceHolder($event)"
            />
          </router-link>

          <div class="search-info__col-2__card__body">
            <h2>{{ searchInfo.original_title }}</h2>
            <span>{{ searchInfo.release_date }}</span>
            <p v-if="searchInfo.overview">
              {{ searchInfo.overview.substring(0, 299) }}
            </p>
            <p v-else>
              there is no data to display
            </p>
          </div>
        </div>
      </div>
      <div v-if="!isLoading" class="loader">
        <img src="../assets/loaderImg.gif" alt="Loader" />
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import Header from "@/components/Header.vue";
export default {
  components: {
    Header,
  },
  data() {
    return {
      data: {},
      query: "",
      isX: false,
      isLoading: false,
    };
  },
  methods: {
    async getQueryParams(URL) {
      if (this.query) {
        let { data } = await axios.get(URL);
        this.data = data.results;
        this.isLoading = true;
        console.log(data);
      }
    },
    showXIcon(e) {
      if (e.type == "focus") {
        this.isX = true;
      } else if (e.type == "blur") {
        this.isX = false;
      }
    },
    clearQuery() {
      this.query = "";
    },
    imgUrl(path) {
      let baseImageURL = "https://image.tmdb.org/t/p/w500/";
      return baseImageURL + path;
    },
    search() {
      if (this.query) {
        let URL = `${process.env.VUE_APP_API_ROOT_URL}/search/multi?api_key=${process.env.VUE_APP_API_KEY}&language=en-US&query=${this.query}&page=1&include_adult=false`;
        this.getQueryParams(URL);
      }
    },
    imgPlaceHolder(e) {
      e.target.attributes.src.nodeValue =
        "https://complianz.io/wp-content/uploads/2019/03/placeholder-300x202.jpg";
    },
    showTitle(title) {
      if (title) {
        return title.replace(/ /g, "");
      }
    },
  },
  watch: {
    query(newVal) {
      this.$router.replace({ query: { query: newVal } });
    },
  },

  created() {
    this.query = this.$route.query.query;
    let URL = `${process.env.VUE_APP_API_ROOT_URL}/search/multi?api_key=${process.env.VUE_APP_API_KEY}&language=en-US&query=${this.query}&page=1&include_adult=false`;
    this.getQueryParams(URL);
  },
};
</script>

<style lang="scss" scoped>
.hide {
  visibility: hidden;
}
.loader {
  display: flex;
  justify-content: center;
  align-items: center;
}
.d-flex {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 10px;
}
.d-flex-col {
  display: flex;
  flex-direction: column;
  margin-bottom: 5px;
}
.search {
  display: flex;
  justify-content: baseline;
  padding: 5px;
  .search__search-icon {
    margin-right: 5px;
    width: 35px;
    height: 35px;
  }
  .search__input {
    font-size: 18px;
    font-style: italic;
    border: none;
    outline: none;
    width: 100%;
    color: #b2b2b2;
  }
  .search__remove-icon-wrapper {
    display: flex;
    align-items: center;
    .search__remove-icon {
      width: 20px;
      height: 20px;
      color: #b2b2b2;
      cursor: pointer;
    }
    .search__remove-icon:hover {
      transform: rotate(150deg);
    }
  }
}
.search-info {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 20px;
  margin-top: 30px;
  padding: 0px 80px 0px 80px;
  .search-info__col-1 {
    width: 270px;
    height: 410px;
    box-shadow: 6px 6px 14px 0 rgba(0, 0, 0, 0.2),
      -8px -8px 18px 0 hsla(0, 0%, 100%, 0.55);
    border-radius: 10px;
    .search-results__tag {
      background: #ddd;
      padding: 0px 8px 0px 8px;
      border-radius: 6px;
    }
    .search-info__col-1__search-Results {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      background: #01b4e4;
      height: 60px;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      .search-Results__title {
        margin-left: 10px;
        font-size: 20px;
        font-weight: bold;
        color: white;
      }
    }
  }
  .search-info__col-2 {
    width: 800px;
    height: 150px;

    .search-info__col-2__card {
      display: flex;
      margin-bottom: 20px;
      box-shadow: 6px 6px 14px 0 rgba(0, 0, 0, 0.2),
        -8px -8px 18px 0 hsla(0, 0%, 100%, 0.55);
      border-radius: 10px;
      .search-info__col-2__card__img {
        width: 95px;
        height: 150px;
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
      }
      .search-info__col-2__card__body {
        margin: 10px 0px 10px 10px;
        h2 {
          font-size: 20px;
          font-weight: bold;
          margin-bottom: 5px;
        }
        span {
          color: #999;
        }
        p {
          margin-top: 15px;
          padding-right: 5px;
          word-break: break-all;
        }
      }
    }
  }
}
</style>
