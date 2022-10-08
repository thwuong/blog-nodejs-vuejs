import createHttp from "@/api/index";
import authHeader from "@/services/authHeader";

class commentService {
  constructor() {
    this.http = createHttp("/api/comment");
  }

  async createComment(payload, blogId) {
    return await this.http.post(`${blogId}/newcomment`, payload, {
      headers: authHeader(),
    });
  }
  async removeComment(id, blogId) {
    return await this.http.delete(`/${blogId}/delete/${id}`, {
      headers: authHeader(),
    });
  }
}

export default new commentService();
