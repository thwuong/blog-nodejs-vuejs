import { defineStore } from "pinia";
import PostService from "../services/PostService.js";
import { storeToRefs } from "pinia";
import { useAuthStore } from "./useAuthStore";
import { useToast } from "./useToastStore";
export const usePostStore = defineStore("post", {
  state: () => {
    return {
      posts: [],
      post: {},
    };
  },
  getters: {
    getPostOfCurrentUser() {
      const { userCurrent } = storeToRefs(useAuthStore());
      return this.posts.filter(
        (post) => post.author._id === userCurrent.value._id
      );
    },
  },
  actions: {
    // create post
    async createPost(payload) {
      const { setToast } = useToast();
      try {
        const response = await PostService.createPost(payload);
        if (response.data.success) {
          this.router.push({ name: "ViewPosts" });
          setToast(response.data);
        }
      } catch (error) {
        setToast(error.response.data);
      }
    },
    // delete post
    async removePost(id) {
      const { setToast } = useToast();

      try {
        const response = await PostService.removePost(id);
        if (response.data.success) {
          setToast(response.data);
        }
      } catch (error) {
        setToast(error.response.data);
      }
    },
    // edit post
    async editPost(id, payload) {
      const { setToast } = useToast();
      try {
        const response = await PostService.editPost(id, payload);
        if (response.data.success) {
          this.router.push({ name: "ViewPosts" });
          setToast(response.data);
        }
      } catch (error) {
        setToast(error.response.data);
      }
    },
    // find post
    async fetchPosts(filters) {
      const { setToast } = useToast();

      try {
        const response = await PostService.getPosts(filters);
        if (response.data.success) {
          this.posts = response.data.posts;
        }
      } catch (error) {
        setToast(error.response.data);
      }
    },
    // findOne
    async findPost(id) {
      const { setToast } = useToast();

      try {
        const response = await PostService.getPost(id);
        if (response.data.success) {
          this.post = response.data.post;
        }
      } catch (error) {
        setToast(error.response.data);
        this.router.push({ name: "NotFound" });
      }
    },

    //handlerFavorite
    async favoritePost(id) {
      try {
        const { setToast } = useToast();

        const response = await PostService.likePost(id);
        if (response.data.success) {
          setToast(response.data);
        }
      } catch (error) {
        return error.response.data.message || error.message;
      }
    },
  },
});
