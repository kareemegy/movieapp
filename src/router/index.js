import { createRouter, createWebHistory } from "vue-router";
const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/HomePage.vue"),
  },

  {
    path: "/details/:type/:id/:name",
    name: "Details",
    component: () => import("@/components/GetDetails.vue"),
  },

  {
    path: "/:catchAll(.*)",
    component: () => import("@/components/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ x: 0, y: 0 }),
});

export default router;
