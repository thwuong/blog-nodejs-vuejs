import createHttp from "@/api/index";
import authHeader from "@/services/authHeader";

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
}

export default new CommentService();
