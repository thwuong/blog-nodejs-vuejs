<script>
import FormPost from "../components/FormPost.vue";
import NavbarTop from "../components/NavbarTop.vue";
import { useAuthStore } from "../stores/useAuthStore.js";
import { usePostStore } from "../stores/usePostStore.js";
import { storeToRefs } from "pinia";
import { useRouter, useRoute } from "vue-router";
import { onMounted } from "vue";
export default {
  components: { FormPost, NavbarTop },
  setup(props, context) {
    const router = useRouter();
    const route = useRoute();

    const { loggedIn } = storeToRefs(useAuthStore());
    const { getProfile } = useAuthStore();
    const { post } = storeToRefs(usePostStore());
    const { editPost, findPost } = usePostStore();

    const postId = route.params.id;
    const checkLogged = async () => {
      if (!loggedIn.value) {
        router.push("/posts");
      }
      await findPost(postId);
      await getProfile();
    };
    const handleEditPost = async (postUpdate) => {
      await editPost(postId, postUpdate);
    };
    onMounted(() => {
      checkLogged();
    });
    return {
      handleEditPost,
      post,
    };
  },
};
</script>
<template>
  <navbar-top :itemActive="'posts'" />
  <div class="form__create">
    <div class="container">
      <h1 class="form__heading">Edit Post</h1>
      <FormPost
        @submit-form="handleEditPost"
        :isEdit="true"
        :postSelected="post"
      />
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
