<script>
import NavbarTop from "@/components/NavbarTop.vue";
import { storeToRefs } from "pinia";
import { usePostStore } from "@/stores/usePostStore.js";
import { useRoute, useRouter } from "vue-router";
import { onMounted } from "vue";
export default {
  components: { NavbarTop },
  setup() {
    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    const route = useRoute();
    const router = useRouter();
    const postId = route.params.id;
    const { post } = storeToRefs(usePostStore());
    const { findPost } = usePostStore();
    const getPostById = async (id) => {
      const { success } = await findPost(id);
      if (!success) {
        router.push({ name: "NotFound" });
      }
    };
    onMounted(() => {
      getPostById(postId);
    });
    return {
      post,
      options,
    };
  },
};
</script>
<template>
  <navbar-top :itemActive="'contact'" />
  <div class="detail">
    <div class="container">
      <div class="post">
        <h1 class="post__heading">
          {{ post.title }}
        </h1>
        <div class="post__author">
          <div class="post__author-avatar">
            <img :src="post.author?.avatar" />
          </div>
          <span class="post__author-name">
            {{ post.author?.username }}
          </span>
          <span class="post__author-timedate">
            {{ new Date(post.createdAt).toLocaleDateString("en-US", options) }}
          </span>
        </div>
        <div class="post__image">
          <img :src="post.image" alt="" />
        </div>
        <div class="post__body" v-html="post.body"></div>
      </div>
    </div>
  </div>
</template>
<style>
.detail {
  width: 1024px;
  margin: 0 auto;
}
</style>
