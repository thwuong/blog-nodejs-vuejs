import { createRouter, createWebHistory } from "vue-router";
import NotFound from "@/views/NotFound.vue";
import ViewProfile from "@/views/ViewProfile.vue";
import ViewPosts from "@/views/ViewPosts.vue";
import Details from "@/views/ViewDetails.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", redirect: "/posts" },
    { path: "/profile", component: ViewProfile, name: "Profile" },
    { path: "/posts", component: ViewPosts, name: "ViewPosts" },
    { path: "/posts/:id", component: Details, name: "ViewDetails" },
    { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
  ],
});

export default router;
