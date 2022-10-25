<script>
import Card from "@/components/Card.vue";
import NavbarTop from "@/components/NavbarTop.vue";
import { usePostStore } from "@/stores/usePostStore.js";
import { useAuthStore } from "@/stores/useAuthStore.js";
import { storeToRefs } from "pinia";
export default {
  components: {
    Card,
    NavbarTop,
  },
  setup() {
    const { posts } = storeToRefs(usePostStore());
    const { loggedIn, userCurrent } = storeToRefs(useAuthStore());
    const { fetchPosts } = usePostStore();
    const { getProfile } = useAuthStore();
    const checkLogged = () => {
      if (loggedIn.value) {
        getProfile();
      }
    };
    fetchPosts();
    checkLogged();
    return {
      posts,
      userCurrent,
    };
  },
};
</script>
<template>
  <navbar-top
    :itemActive="'posts'"
    :username="userCurrent.username"
    :avatar="userCurrent.avatar"
  />
  <div class="posts">
    <div class="container">
      <div class="posts__content mx-auto">
        <h1 class="posts__heading">Blog posts</h1>
        <span class="posts__sub">
          Our latest updates and blogs about managing your team
        </span>
        <div class="cards">
          <router-link v-for="post in posts" :to="`/posts/${post._id}`">
            <card
              :title="post.title"
              :description="post.description"
              :image="post.image"
              :author="post.author.username"
              :avatar="post.author.avatar"
              :dateTime="post.createdAt"
            />
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.posts__content {
  width: 1024px;
  margin-top: 90px;
}
</style>
