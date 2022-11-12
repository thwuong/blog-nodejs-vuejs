<script>
import Card from "@/components/Card.vue";
import NavbarTop from "@/components/NavbarTop.vue";
import Search from "@/components/Search.vue";
import Filter from "@/components/Filter.vue";
import { usePostStore } from "@/stores/usePostStore.js";
import { useAuthStore } from "@/stores/useAuthStore.js";
import { storeToRefs } from "pinia";
import { useRoute, useRouter } from "vue-router";
import { reactive, onMounted } from "vue";
export default {
  components: {
    Card,
    NavbarTop,
    Search,
    Filter,
  },
  setup() {
    const fillers = reactive({
      keyword: "",
      tags: "",
    });
    const route = useRoute();
    const router = useRouter();
    const { posts } = storeToRefs(usePostStore());
    const { fetchPosts } = usePostStore();
    const searchingPosts = async (keyword) => {
      router.push(`${route.path}?keyword=${keyword}`);
      fillers.keyword = keyword;
      await fetchPosts(fillers);
    };
    const sortingPosts = async (tags) => {
      router.push(`${route.path}?tags=${tags.join(",")}`);
      fillers.tags = tags;
      await fetchPosts(fillers);
    };
    const clearContentSearching = () => {
      router.push("");
      fillers.keyword = "";
      fetchPosts(fillers);
    };
    onMounted(() => {
      fetchPosts();
    });
    return {
      posts,
      searchingPosts,
      clearContentSearching,
      sortingPosts,
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
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
