<template>
  <div class="hero ">
    <h1>Welcome.</h1>
    <h2>Millions of movies, TV shows and people to discover. Explore now.</h2>
    <label for=""> </label>
    <div class="search_bar">
      <label for="search"></label>
      <input
        @keydown.enter="searchQuery"
        v-model="query"
        placeholder="Search for a movie, tv show, person......"
        type="text"
      />
      <button @click="searchQuery">Search</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: "",
    };
  },
  methods: {
    searchQuery() {
      if (this.query) {
        this.$router.push({
          name: "search",
          query: { query: this.query },
        });
      }
    },
  },
};
</script>

<style scoped>
.hero {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 30px;
  color: white;
  height: 400px;
  background-size: cover;
  background-image: linear-gradient(
      to right,
      rgba(3, 37, 65, 0.8) 0%,
      rgba(3, 37, 65, 0) 100%
    ),
    url("https://image.tmdb.org/t/p/w1920_and_h600_multi_faces_filter(duotone,032541,01b4e4)/uozb2VeD87YmhoUP1RrGWfzuCrr.jpg");
  font-size: 20px;
}

.hero h1 {
  margin-bottom: 0px;
}
.hero h2 {
  margin-top: 0px;
  padding-bottom: 20px;
}
.search_bar {
  position: relative;
}
input {
  font-size: 16px;
  width: 90%;
  border-radius: 30px;
  border: 1px solid #fff;
  outline: none;
  padding: 12px;
}

button {
  font-size: 15px;
  font-weight: bold;
  bottom: 0px;
  top: 0px;
  right: 88px;
  position: absolute;
  color: rgba(255, 255, 255, 1);
  border-radius: 30px;
  border: none;
  background: linear-gradient(
    to right,
    rgba(30, 213, 169, 1) 0%,
    rgba(1, 180, 228, 1) 100%
  );
  padding: 12px 27px 12px 27px;
  transition: color 0.2s ease-in-out;
}

button:hover {
  color: rgba(3, 37, 65);
}
</style>
