import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/views/HomePage.vue";
import GetDetails from "@/components/GetDetails.vue";
import NotFound from "@/components/NotFound.vue";
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
    path: "/:catchAll(.*)",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ y: 0 }),
});

export default router;
