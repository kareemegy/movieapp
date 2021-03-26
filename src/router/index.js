import { createRouter, createWebHistory } from "vue-router";
const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/HomePage.vue"),
  },
  {
    path: "/details/:type/:id/:name",
    name: "details",
    component: () => import("@/views/GetDetails.vue"),
  },
  {
    path: "/person/:id/:name",
    name: "person",
    component: () => import("@/views/Persone.vue"),
  },
  {
    path: "/search",
    name: "search",
    component: () => import("@/views/SearchPage.vue"),
  },
  {
    path: "/keywords",
    name: "keywords",
    component: () => import("@/views/Keywords.vue"),
  },
  {
    path: "/:catchAll(.*)",
    name: "404",
    component: () => import("@/views/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ x: 0, y: 0 }),
});

export default router;
