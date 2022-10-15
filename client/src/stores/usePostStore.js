import { defineStore } from "pinia";
import PostService from "@/services/PostService";

export const usePostStore = defineStore("post", {
  state: () => {
    return {
      posts: [],
      post: {},
      postHighlight: [],
    };
  },
  actions: {
    // create post
    async createPost(payload) {
      try {
        const response = await PostService.createPost(payload);
        if (response.data.success) {
          return response.data;
        }
      } catch (error) {
        return response.success.message || error.message;
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
        return response.success.message || error.message;
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
        return response.success.message || error.message;
      }
    },
    // find post
    async findPosts() {
      try {
        const response = await PostService.getPosts();
        if (response.data.success) {
          this.$patch({ posts: response.data.posts });
          return response.data;
        }
      } catch (error) {
        return response.success.message || error.message;
      }
    },
    // findOne
    async findPost(id) {
      try {
        const response = await PostService.getPost(id);
        if (response.data.success) {
          this.$patch({ post: response.data.post });
          return response.data;
        }
      } catch (error) {
        return response.success.message || error.message;
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
        return response.success.message || error.message;
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
        return response.success.message || error.message;
      }
    },
  },
});
