<script>
import NavbarTop from "../components/NavbarTop.vue";
import Comment from "../components/Comment.vue";
import { storeToRefs } from "pinia";
import { usePostStore } from "../stores/usePostStore.js";
import { useAuthStore } from "../stores/useAuthStore.js";
import { useCommentStore } from "../stores/useCommentStore.js";
import { useRoute } from "vue-router";
import { onMounted } from "vue";
export default {
  components: { NavbarTop, Comment },
  setup() {
    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    const route = useRoute();
    const postId = route.params.id;
    const { post } = storeToRefs(usePostStore());
    const { comments } = storeToRefs(useCommentStore());
    const { userCurrent } = storeToRefs(useAuthStore());
    const { postComment, getComments, deleteComment } = useCommentStore();
    const { findPost } = usePostStore();
    const getPostById = async (id) => {
      await findPost(id);
    };
    const getCommentsById = async (id) => {
      await getComments(id);
    };
    const handlePostComment = async (value) => {
      await postComment({ body: value }, postId);
      await getCommentsById(postId);
    };
    const handleDeleteComment = async (id) => {
      await deleteComment(id, postId);
      await getCommentsById(postId);
    };
    onMounted(() => {
      getPostById(postId);
      getCommentsById(postId);
    });
    return {
      post,
      options,
      handlePostComment,
      comments,
      userCurrent,
      handleDeleteComment,
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

  <h1 class="mt-4 mb-8 ml-10 font-bold text-xl">
    List Comment({{ comments.length }})
  </h1>
  <div
    class="w-2/3 mx-auto h-[400px] overflow-y-scroll"
    v-if="comments.length > 0"
  >
    <div
      class="flex rounded-xl bg-white shadow-xl py-3 px-4 mt-11"
      v-for="comment in comments"
    >
      <div
        class="mx-2 flex h-16 w-16 items-center justify-center overflow-hidden rounded-full flex-shrink-0"
      >
        <img :src="comment.author.avatar" />
      </div>

      <div class="ml-4 w-full">
        <div class="flex w-full items-center justify-between">
          <h2 class="text-lg font-medium">{{ comment.author.username }}</h2>
          <p>
            {{
              new Date(comment.createdAt).toLocaleDateString("en-US", options)
            }}
          </p>
        </div>
        <div class="mt-4">
          <p>{{ comment.body }}</p>

          <div
            class="mt-4 space-x-2"
            v-if="comment.author._id === userCurrent._id"
          >
            <button
              @click="
                () => {
                  handleDeleteComment(comment._id);
                }
              "
              class="px-4 py-2 rounded-xl bg-rose-400 text-white font-medium"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Comment @post-comment="handlePostComment" />
</template>
<style></style>
