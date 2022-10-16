<script setup>
import CardComponent from "@/components/CardComponent.vue";
import NavbarTopComponent from "@/components/NavbarTopComponent.vue";
import { usePostStore } from "@/stores/usePostStore.js";
import { storeToRefs } from "pinia";
const { fetchPosts } = usePostStore();
fetchPosts();
const { posts } = storeToRefs(usePostStore());
</script>
<template>
  <navbar-top-component />

  <div class="posts">
    <div class="container">
      <div class="posts__content mx-auto">
        <h1 class="posts__heading">Blog posts</h1>
        <span class="posts__sub">
          Our latest updates and blogs about managing your team
        </span>
        <div class="cards">
          <card-component />
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
