<template>
  <div class="header ">
    <div class="container">
      <div class="col-1">
        <router-link to="/" @click="redirect()">
          <img
            src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
            alt="logo"
          />
        </router-link>
        <ul class="nav_info col-2">
          <li>Movies</li>
          <li>TV Shows</li>
          <li>People</li>
          <li>More</li>
        </ul>
      </div>
      <ul class="nav_icons col-2">
        <li>
          <img
            src="https://www.flaticon.com/svg/static/icons/svg/1828/1828817.svg"
            alt="plus Icon"
          />
        </li>
        <li>
          <img
            src="https://www.flaticon.com/svg/static/icons/svg/889/889588.svg"
            alt="lang icon "
          />
        </li>
        <li>
          <img
            src="https://www.flaticon.com/svg/static/icons/svg/599/599305.svg"
            alt="profile icon"
          />
        </li>
        <li>
          <img
            src="https://www.flaticon.com/svg/static/icons/svg/639/639375.svg"
            alt="search icon"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    redirect() {
      this.$progress.start();
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 1300px;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.header {
  width: 100%;
  height: 70px;
  background-color: #032541;
}
li {
  list-style: none;
}

img {
  width: 150px;
  height: 20px;
}
.col-1 {
  img {
    margin-left: 20px;
  }
  display: flex;
  align-items: center;
  color: white;
  ul {
    margin-left: 10px;
    li {
      padding: 10px;
    }
  }
}

.col-2 {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 20px;

  img {
    margin-right: 25px;
    width: 40px;
    height: 25px;
  }
}
</style>
