<template>
  <div class=" footer">
    <div class="container">
      <img
        src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg"
        alt="The Movie Database image"
      />
      <ul>
        <li>THE BASICS</li>
        <li>About TMDb</li>
        <li>Contact Us</li>
        <li>Support Forums</li>
        <li>Api</li>
        <li>System Status</li>
      </ul>
      <ul>
        <li>Get Involved</li>
        <li>Contribution Bible</li>
        <li>3rd Party Applications</li>
        <li>Add New Movie</li>
        <li>Add New TV Show</li>
      </ul>
      <ul>
        <li>Community</li>
        <li>Guidelines</li>
        <li>Discussions</li>
        <li>Leaderboard</li>
        <li>Twitter</li>
      </ul>
      <ul>
        <li>Legal</li>
        <li>Terms of Use</li>
        <li>API Terms of Use</li>
        <li>Privacy Policy</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.footer {
  background: #032440;
  // position: absolute;
  // width: 100%;
  // bottom: 0px;
  .container {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    padding: 50px;
    img {
      width: 130px;
      height: 94px;
      margin-top: 25px;
    }
    li {
      list-style: none;
      color: #fff;
      padding-bottom: 3px;
    }
    ul li:nth-child(1) {
      font-weight: bold;
      margin-bottom: 6px;
    }
  }
}
</style>
