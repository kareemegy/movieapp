<template>
  <div v-if="data">
      <p>{{data}}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: "",
    };
  },
  methods: {
    getQueryParams() {},
  },
  created() {
    this.data = this.$route.query.query;
  },
};
</script>

<style lang="scss" scoped></style>
