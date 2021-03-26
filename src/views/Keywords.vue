<template>
  <div>
    <h1>{{ title }}</h1>
    <input type="text" v-model="name" />
    <button @click="show = !show">Change the Name</button>
    <h1 v-if="show">{{ name }}</h1>
  </div>
</template>

<script>
import { onMounted, reactive, toRefs, watch } from "vue";
export default {
  setup() {
    const state = reactive({
      title: "karim",
      name: "",
      show: false,
    });

    const sayHello = () => {
      return `hello ${state.title}`;
    };

    const showMyName = () => {
      state.show = true;
    };

    onMounted(() => {
      console.log("we're here");
    });
    watch(
      () => state.name,
      (newVal, oldVal) => {
        console.log(newVal, oldVal);
      }
    );

    return {
      ...toRefs(state),
      sayHello,
      showMyName,
    };
  },
};
</script>

<style lang="scss" scoped></style>
