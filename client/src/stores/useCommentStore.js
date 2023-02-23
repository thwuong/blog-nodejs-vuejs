import { defineStore } from "pinia";
import { useToast } from "./useToastStore";
import CommentService from "../services/CommentService.js";

export const useCommentStore = defineStore("comment", {
  state: () => {
    return {
      comments: [],
    };
  },
  actions: {
    async postComment(payload, postId) {
      const { setToast } = useToast();

      try {
        const response = await CommentService.createComment(payload, postId);

        if (response.data.success) {
          this.comments.push(response.data.newComment);
          this.router.push({ name: "ViewDetail" });
          setToast(response.data);
        }
      } catch (error) {
        setToast(error.response.data);
      }
    },
    async getComments(postId) {
      try {
        const response = await CommentService.getAll(postId);

        if (response.data.success) {
          this.comments = response.data.comments;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async deleteComment(id, postId) {
      const { setToast } = useToast();
      try {
        const response = await CommentService.removeComment(id, postId);

        if (response.data.success) {
          this.comments = this.comments.filter((comment) => comment._id !== id);
          setToast(response.data);
        }
      } catch (error) {
        setToast(error.response.data);
      }
    },
  },
});
