import { defineStore } from "pinia";
import PostService from "@/services/PostService";
import { useAuthStore } from "@/stores/useAuthStore.js";
import { storeToRefs } from "pinia";

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
      try {
        const response = await PostService.createPost(payload);
        console.log(response);
        if (response.data.success) {
          return response.data;
        }
      } catch (error) {
        return error.response.data.message || error.message;
      }
    },
    // delete post
    async removePost(id) {
      try {
        const response = await PostService.removePost(id);
        if (response.data.success) {
          return response.data;
        }
      } catch (error) {
        return error.response.data.message || error.message;
      }
    },
    // edit post
    async editPost(id, payload) {
      try {
        const response = await PostService.editPost(id, payload);
        if (response.data.success) {
          return response.data;
        }
      } catch (error) {
        return error.response.data.message || error.message;
      }
    },
    // find post
    async fetchPosts(filters) {
      try {
        const response = await PostService.getPosts(filters);
        if (response.data.success) {
          this.posts = response.data.posts;
          return response.data;
        }
      } catch (error) {
        return error.response.data.message || error.message;
      }
    },
    // findOne
    async findPost(id) {
      try {
        const response = await PostService.getPost(id);
        if (response.data.success) {
          this.post = response.data.post;
          return response.data;
        }
      } catch (error) {
        return error.response.data.message || error.message;
      }
    },
    // likes
    async likePost(id) {
      try {
        const response = await PostService.handlerLike(id);
        if (response.data.success) {
          return response.data;
        }
      } catch (error) {
        return error.response.data.message || error.message;
      }
    },
    // fovs handlerFavorite
    async favoritePost(id) {
      try {
        const response = await PostService.handlerFavorite(id);
        if (response.data.success) {
          return response.data;
        }
      } catch (error) {
        return error.response.data.message || error.message;
      }
    },
  },
});
