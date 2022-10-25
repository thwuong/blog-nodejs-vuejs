<script>
import FormPost from "@/components/FormPost.vue";
import NavbarTop from "@/components/NavbarTop.vue";
import { useAuthStore } from "@/stores/useAuthStore.js";
import { usePostStore } from "@/stores/usePostStore.js";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
export default {
  components: { FormPost, NavbarTop },
  setup(props, context) {
    const router = useRouter();
    const { loggedIn, userCurrent } = storeToRefs(useAuthStore());
    const { getProfile } = useAuthStore();
    const { createPost } = usePostStore();
    const checkLogged = () => {
      if (!loggedIn.value) {
        router.push("/posts");
      }
      getProfile();
    };
    checkLogged();

    const createNewPost = async (newPost) => {
      newPost.append("author", userCurrent.value._id);
      const { success, message } = await createPost(newPost);

      if (success) {
        router.push("/posts");
      } else {
        alert(message);
      }
    };
    return {
      userCurrent,
      createNewPost,
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
  <div class="form__create">
    <div class="container">
      <h1 class="form__heading">Create New Post</h1>
      <FormPost @create-post="createNewPost" />
    </div>
  </div>
</template>
<style>
.form__create {
  width: 1024px;
  margin: 0 auto;
}
.form__heading {
  font-size: 32px;
  margin-top: 20px;
}
</style>
