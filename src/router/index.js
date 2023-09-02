// Composables
import { createRouter, createWebHistory } from "vue-router";
//import CountryView from "@/views/CountryView.vue";

const routes = [
  {
    path: "/country/:code",
    name: "CountryView",
    component: () => import("@/views/CountryView.vue"),
  },
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home.vue"),
  },

  // {
  //   path: "/",
  //   component: () => import("@/layouts/default/Home.vue"),
  //   children: [
  //     {
  //       path: "",
  //       name: "Home",
  //       // route level code-splitting
  //       // this generates a separate chunk (about.[hash].js) for this route
  //       // which is lazy-loaded when the route is visited.
  //       component: () =>
  //         import(/* webpackChunkName: "home" */ "@/views/Home.vue"),
  //     },
  //   ],
  // },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
