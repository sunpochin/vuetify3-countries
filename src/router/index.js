// Composables
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/country/:code",
    name: "CountryView",
    component: () => import("@/views/CountryView.vue"),
  },
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/AllView.vue"),
  },
  {
    path: "/test",
    name: "TestView",
    component: () => import("@/views/TestView.vue"),
  },

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
