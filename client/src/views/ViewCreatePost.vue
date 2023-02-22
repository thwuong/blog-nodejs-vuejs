<script>
import FormPost from "../components/FormPost.vue";
import NavbarTop from "../components/NavbarTop.vue";
import { useAuthStore } from "../stores/useAuthStore.js";
import { usePostStore } from "../stores/usePostStore.js";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
export default {
  components: { FormPost, NavbarTop },
  setup() {
    const router = useRouter();
    const { loggedIn, userCurrent } = storeToRefs(useAuthStore());
    const { post } = storeToRefs(usePostStore());
    const { createPost } = usePostStore();
    const checkLogged = () => {
      post.value = {};
      if (!loggedIn.value) {
        router.push("/posts");
      }
    };

    const createNewPost = async (newPost) => {
      await createPost(newPost);
    };
    onMounted(() => {
      checkLogged();
    });
    return {
      userCurrent,
      createNewPost,
    };
  },
};
</script>
<template>
  <navbar-top :itemActive="'posts'" />
  <div class="form__create">
    <div class="container">
      <h1 class="form__heading">Create New Post</h1>
      <FormPost @submit-form="createNewPost" />
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
