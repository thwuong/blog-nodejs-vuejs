import createHttp from "../api/index";
import authHeader from "./authHeader";

class CommentService {
  constructor() {
    this.http = createHttp("/api/comment");
  }

  async createComment(payload, postId) {
    return await this.http.post(`${postId}/newcomment`, payload, {
      headers: authHeader(),
    });
  }
  async removeComment(id, postId) {
    return await this.http.delete(`/${postId}/delete/${id}`, {
      headers: authHeader(),
    });
  }
  async getAll(postId) {
    return await this.http.get(`/${postId}`, {
      headers: authHeader(),
    });
  }
}

export default new CommentService();
