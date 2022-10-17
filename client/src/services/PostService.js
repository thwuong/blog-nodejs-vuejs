import createHttp from "@/api/index";
import authHeader from "@/services/authHeader";

class PostService {
  constructor() {
    this.http = createHttp("/api/post");
  }

  async createPost(payload) {
    return await this.http.post("/newpost", payload, { headers: authHeader() });
  }
  async getPosts() {
    return await this.http.get("/");
  }
  async getPost(id) {
    return await this.http.get(`/${id}`);
  }
  async editPost(payload, id) {
    return await this.http.put(`/${id}/edit`, payload, {
      headers: authHeader(),
    });
  }
  async removePost(id) {
    return await this.http.delete(`/${id}/delete`, { headers: authHeader() });
  }
  async handlerLike(id) {
    return await this.http.put(`/${id}/like`, { headers: authHeader() });
  }
  async handlerFavorite(id) {
    return await this.http.put(`/${id}/favorite`, { headers: authHeader() });
  }
}

export default new PostService();