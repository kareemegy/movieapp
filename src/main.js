import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Vue3ProgressBar from "vue3-progress-bar";
import LazyLoadDirective from './directive/LazyLoadDirective.js';
import "./main.css";
const options = {
  position: "fixed",
  height: "3px",
  color: "#1ab8d9",
};

createApp(App)
  .use(router)
  .use(Vue3ProgressBar, options)
  .directive("lazyload",LazyLoadDirective)
  .mount("#app");
