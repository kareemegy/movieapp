<template>
  <Header />
  <div class="container person" v-if="data">
    <div class="person__col-1 d-flex-col" v-if="data.person">
      <img
        class="person__col-1__img"
        :src="imgUrl(data.person.profile_path)"
        alt="img"
      />
      <div class="person__col-1__info d-flex-col ">
        <h3>Personal Info</h3>
        <div class="d-flex-col">
          <h4>Known For</h4>
          <p>{{ data.person.known_for_department }}</p>
        </div>
        <div class="d-flex-col">
          <h4>Known Credits</h4>
          <p>10</p>
        </div>
        <div class="d-flex-col">
          <h4>Gender</h4>
          <p>{{ data.person.gender == 1 ? "Female" : "Male" }}</p>
        </div>
        <div class="d-flex-col">
          <h4>Birthday</h4>
          <p>1991-10-07 (29 years old)</p>
        </div>
        <div class="d-flex-col">
          <h4>Place of Birth</h4>
          <p>Los Angeles, U.S.A</p>
        </div>
        <div class="d-flex-col">
          <h4>Also Known As</h4>
          <p>-</p>
        </div>
      </div>
    </div>
    <div class="person__col-2 d-flex-col" v-if="data.person">
      <h1>{{ data.person.name }}</h1>
      <div class="person__col-2__biography d-flex-col mb">
        <h4>Biography</h4>
        <p>
          We don't have a biography for
          {{ data.person.name }}
        </p>
      </div>
      <div class="person__col-2__known-For d-flex-col">
        <h4 class="mb-10">Known For</h4>
        <div
          v-if="data.person.known_for"
          class="person__col-2__known-For__show-list d-flex"
        >
          <div
            class="d-flex-col mr"
            v-for="shows in data.person.known_for"
            :key="shows.id"
          >
            <router-link
              :to="
                `/details/${shows.media_type}/${shows.id}/${showTitle(
                  shows.original_title,
                  shows.original_name
                )}`
              "
            >
              <img
                v-lazyload
                width="370"
                height="230"
                class="person__col-2__known-For__img"
                :data-src="imgUrl(shows.backdrop_path)"
                :alt="imgUrl(shows.backdrop_path)"
              />
              <p>
                {{
                  shows.original_title
                    ? shows.original_title
                    : shows.original_name
                }}
              </p>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import axios from "axios";
export default {
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      data: {},
      baseImageURL: "https://image.tmdb.org/t/p/w500/",
    };
  },
  methods: {
    async getPersonData(URL) {
      try {
        let { data } = await axios.get(URL);
        this.data = data;
        console.log(data);
      } catch (err) {
        console.error(err);
      }
    },
    imgUrl(path) {
      return this.baseImageURL + path;
    },
    showTitle(title1, title2) {
      return title1 ? title1.replace(/ /g, "") : title2.replace(/ /g, "");
    },
  },
  created() {
    let personId = this.$route.params.id;
    let URL = `${process.env.VUE_APP_API_ROOT_URL}/credit/${personId}?api_key=${process.env.VUE_APP_API_KEY}`;
    this.getPersonData(URL);
  },
};
</script>

<style lang="scss" scoped>
.d-flex {
  display: flex;
}
.d-flex-col {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}
h1 {
  font-size: 26px;
  font-weight: bold;
  margin-bottom: 30px;
}
h3 {
  font-size: 24px;
  font-weight: bold;
  margin: 5px 0px 15px 0px;
}
h4 {
  font-size: 20px;
  font-weight: bold;
}
p {
  font-size: 18px;
}
.mr {
  margin-right: 10px;
}
.mb {
  margin-bottom: 30px;
}
.mb-10 {
  margin-bottom: 10px;
}
.person {
  display: grid;
  grid-template-columns: 1fr 2fr;
  margin-top: 20px;
  .person__col-1__img {
    width: 300px;
    height: 450px;
    border-radius: 10px;
    margin-bottom: 15px;
  }
  .person__col-2__known-For__show-list {
    overflow: auto;
    width: 600px;
    height: 100%;
    .person__col-2__known-For__img {
      border-radius: 10px;
    }
    p {
      text-align: center;
      word-break: break-all;
    }
  }
}
</style>
