<script>
import Card from "@/components/Card.vue";
import NavbarTop from "@/components/NavbarTop.vue";
import Search from "@/components/Search.vue";
import Filter from "@/components/Filter.vue";
import { usePostStore } from "@/stores/usePostStore.js";
import { storeToRefs } from "pinia";
import { useRoute, useRouter } from "vue-router";
export default {
  components: {
    Card,
    NavbarTop,
    Search,
    Filter,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const { posts } = storeToRefs(usePostStore());
    const { fetchPosts } = usePostStore();
    const handleSeachPosts = async (value) => {
      router.push(`${route.path}?keyword=${value}`);
      await fetchPosts(value);
    };
    const clearContent = () => {
      router.push("");
      fetchPosts();
    };
    fetchPosts();
    return {
      posts,
      handleSeachPosts,
      clearContent,
    };
  },
};
</script>
<template>
  <navbar-top :itemActive="'posts'" />
  <div class="posts">
    <div class="container">
      <div class="posts__intro">
        <div class="posts__heading">
          <h1 class="posts__title">Blog posts</h1>
          <span class="posts__subtitle">
            Our latest updates and blogs about managing your team
          </span>
        </div>
        <div class="posts__search">
          <search
            @search-posts="handleSeachPosts"
            @clear-content="clearContent"
          />
        </div>
      </div>
      <div class="posts__filter">
        <Filter />
      </div>
      <div class="posts__content mx-auto">
        <div class="cards">
          <router-link v-for="post in posts" :to="`/post/${post._id}`">
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

<style scoped></style>
