import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/views/HomePage.vue";
import GetDetails from "@/components/GetDetails.vue";
import NotFound from "@/components/NotFound.vue";
import test from "@/components/test.vue";
const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
  },

  {
    path: "/details/:type/:id/:name",
    name: "Details",
    component: GetDetails,
  },
  {
    path: "/test",
    name: "test",
    component: test,
  },
  {
    path: "/:catchAll(.*)",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
