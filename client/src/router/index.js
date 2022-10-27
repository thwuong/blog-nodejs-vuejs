import { createRouter, createWebHistory } from "vue-router";
import NotFound from "@/views/NotFound.vue";
import ViewProfile from "@/views/ViewProfile.vue";
import ViewPosts from "@/views/ViewPosts.vue";
import ViewCreatePost from "@/views/ViewCreatePost.vue";
import ViewEditPost from "@/views/ViewEditPost.vue";
import ViewLogin from "@/views/ViewLogin.vue";
import ViewRegister from "@/views/ViewRegister.vue";
import ViewDetail from "@/views/ViewDetails.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", redirect: "/posts" },
    { path: "/auth/profile", component: ViewProfile, name: "ViewProfile" },
    { path: "/auth/login", component: ViewLogin, name: "ViewLogin" },
    { path: "/auth/register", component: ViewRegister, name: "ViewRegister" },
    { path: "/posts", component: ViewPosts, name: "ViewPosts" },
    {
      path: "/post/newpost",
      component: ViewCreatePost,
      name: "ViewCreatePost",
    },
    { path: "/post/:id", component: ViewDetail, name: "ViewDetail" },
    { path: "/post/:id/edit", component: ViewEditPost, name: "ViewEditPost" },
    { path: "/:pathMatch(.*)*", component: NotFound, name: "NotFound" },
  ],
});

export default router;
