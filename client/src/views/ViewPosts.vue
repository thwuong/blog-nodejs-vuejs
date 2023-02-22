<script>
import Card from "../components/Card.vue";
import NavbarTop from "../components/NavbarTop.vue";
import Search from "../components/Search.vue";
import Filter from "../components/Filter.vue";

import { useAuthStore } from "../stores/useAuthStore";
import { usePostStore } from "../stores/usePostStore.js";
import { useToast } from "../stores/useToastStore";
import { storeToRefs } from "pinia";

import { reactive, onMounted } from "vue";
export default {
  components: {
    Card,
    NavbarTop,
    Search,
    Filter,
  },
  setup() {
    const filters = reactive({
      keyword: "",
      tags: "",
    });

    const { setToast } = useToast();
    const { loggedIn } = storeToRefs(useAuthStore());
    const { posts } = storeToRefs(usePostStore());
    const { fetchPosts, favoritePost } = usePostStore();
    const searchingPosts = async (keyword) => {
      filters.keyword = keyword;
      await fetchPosts(filters);
    };
    const sortingPosts = async (tags) => {
      filters.tags = tags;
      await fetchPosts(filters);
    };
    const clearContentSearching = () => {
      filters.keyword = "";
      fetchPosts(filters);
    };

    const favingPost = async (id) => {
      if (!loggedIn.value) {
        setToast({ success: false, message: "user need signing" });
      } else {
        await favoritePost(id);
        fetchPosts();
      }
    };
    onMounted(() => {
      fetchPosts();
    });
    return {
      posts,
      searchingPosts,
      clearContentSearching,
      sortingPosts,
      favingPost,
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
            @search-posts="searchingPosts"
            @clear-content="clearContentSearching"
          />
        </div>
      </div>
      <div class="posts__filter">
        <Filter @select-tags="sortingPosts" />
      </div>
      <div class="posts__content mx-auto">
        <div class="cards">
          <card
            v-for="post in posts"
            :id="post._id"
            :title="post.title"
            :description="post.description"
            :image="post.image"
            :favs="post.favs"
            :votes="post.votes"
            :author="post.author.username"
            :avatar="post.author.avatar"
            :dateTime="post.createdAt"
            @fav-post="favingPost"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
