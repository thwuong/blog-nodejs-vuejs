import { createRouter, createWebHistory } from "vue-router";
import ViewHome from "@/views/ViewHome.vue";
import NotFound from "@/views/NotFound.vue";
import ViewProfile from "@/views/ViewProfile.vue";
import ViewPosts from "@/views/ViewPosts.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/homepage", component: ViewHome },
    { path: "/", redirect: "/homepage" },
    { path: "/profile", component: ViewProfile, name: "Profile" },
    { path: "/posts", component: ViewPosts, name: "ViewPosts" },
    { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
  ],
});

export default router;
