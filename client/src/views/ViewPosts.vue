<script setup>
import { usePostStore } from "@/stores/usePostStore.js";
import postComponent from "../components/postComponent.vue";
import { storeToRefs } from "pinia";
const { findPosts } = usePostStore();
findPosts();
const { posts, post } = storeToRefs(usePostStore());
</script>
<template>
  <div class="posts" v-for="post in posts">
    <post-component
      :title="post.title"
      :body="post.body"
      :image="post.image"
      :author="post.author.username"
    />
    <br />
  </div>
</template>

<style></style>
