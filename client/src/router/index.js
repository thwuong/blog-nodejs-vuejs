import { createRouter, createWebHistory } from "vue-router";
import ViewHome from "@/views/ViewHome.vue";
import NotFound from "@/views/NotFound.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/home", component: ViewHome },
    { path: "/", redirect: "/home" },
    { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
  ],
});

export default router;
