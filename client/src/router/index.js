import { createRouter, createWebHistory } from "vue-router";
import ViewHome from "@/views/ViewHome.vue";
import NotFound from "@/views/NotFound.vue";
import ViewProfile from "@/views/ViewProfile.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/home", component: ViewHome },
    { path: "/", redirect: "/home" },
    { path: "/profile", component: ViewProfile, name: "Profile" },
    { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
  ],
});

export default router;
