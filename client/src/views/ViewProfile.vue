<script>
import NavbarTop from "../components/NavbarTop.vue";
import Card from "../components/Card.vue";
import Modal from "../components/Modal.vue";

import { useModalStore } from "../stores/useModalStore.js";
import { useAuthStore } from "../stores/useAuthStore.js";
import { usePostStore } from "../stores/usePostStore.js";
import { storeToRefs } from "pinia";

import { useRouter } from "vue-router";
import { onMounted } from "vue";

export default {
  components: { NavbarTop, Card, Modal },
  setup() {
    const router = useRouter();

    const { setModal } = useModalStore();
    const { loggedIn, userCurrent } = storeToRefs(useAuthStore());
    const { getPostOfCurrentUser } = storeToRefs(usePostStore());
    const { fetchPosts, removePost } = usePostStore();

    const checkLogged = () => {
      if (loggedIn.value) {
        fetchPosts();
      } else {
        router.push("/posts");
      }
    };

    const handleRemovePost = async (id) => {
      await removePost(id);
    };
    onMounted(() => {
      checkLogged();
    });
    return {
      getPostOfCurrentUser,
      handleRemovePost,
      userCurrent,
      setModal,
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
          <img :src="userCurrent.avatar" />
        </div>
        <div class="user__info">
          <h3 class="user__name">{{ userCurrent.username }}</h3>
          <span class="user__followings"> 730 followings </span>
        </div>
        <div class="user__control">
          <div class="user__edit" @click="setModal">
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
  <Modal></Modal>
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
