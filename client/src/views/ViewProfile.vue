<script>
import NavbarTop from "@/components/NavbarTop.vue";
import Card from "@/components/Card.vue";
import { useAuthStore } from "@/stores/useAuthStore.js";
import { usePostStore } from "@/stores/usePostStore.js";
import { storeToRefs } from "pinia";
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";

export default {
  components: { NavbarTop, Card },
  setup() {
    const posts = ref([]);
    const router = useRouter();
    const { loggedIn } = storeToRefs(useAuthStore());
    const { getPostOfCurrentUser } = storeToRefs(usePostStore());
    const { fetchPosts, removePost } = usePostStore();
    const checkLogged = () => {
      if (loggedIn.value) {
        fetchPosts();
      } else {
        router.push("/posts");
      }
    };
    checkLogged();
    const handleRemovePost = async (id) => {
      const { success, message } = await removePost(id);
      if (success) {
        fetchPosts();
      } else {
        alert(message);
      }
    };
    return {
      posts,
      getPostOfCurrentUser,
      handleRemovePost,
    };
  },
};
</script>
<template>
  <navbar-top :itemActive="'profile'" />
  <div class="app__container">
    <div class="user">
      <div class="user__profile">
        <div class="user__avatar">
          <img
            src="../assets/images/IMG_1617893921168_1617894411066.jpg"
            alt=""
          />
        </div>
        <div class="user__info">
          <h3 class="user__name">Thuong Duong</h3>
          <span class="user__followings"> 730 followings </span>
        </div>
        <div class="user__control">
          <div class="user__edit">
            <font-awesome-icon icon="fa-solid fa-pen" />
            Edit profile
          </div>
        </div>
      </div>
      <div class="line"></div>
      <h1 class="user__heading">My Posts</h1>
      <div class="user__posts">
        <card
          v-for="post in getPostOfCurrentUser"
          :id="post._id"
          :title="post.title"
          :image="post.image"
          :description="post.description"
          :isEdit="true"
          :isRemove="true"
          @remove-post="handleRemovePost"
        />
      </div>
    </div>
  </div>
</template>
<style>
.user {
  @apply my-[90px];
}
.user__profile {
  @apply flex items-center gap-6 bg-gray-200 p-2 rounded-xl;
}
.user__avatar {
  @apply w-44 h-44 overflow-hidden rounded-full border-4 border-gray-400;
}
.user__name {
  @apply font-primary text-xl font-bold;
}
.user__control {
  @apply ml-64;
}
.user__edit {
  @apply py-1 px-2 bg-blue-500 rounded-xl cursor-pointer text-white ease-in duration-200 hover:bg-blue-600;
}
.line {
  @apply w-full h-1 bg-gray-300 mt-8;
}
.user__heading {
  @apply text-2xl font-primary font-bold text-gray-500;
}
.user__posts {
  @apply mt-[20px] grid grid-cols-3 gap-x-6 gap-y-16;
}
</style>
