import createHttp from "@/api/index";
import authHeader from "@/services/authHeader";

class PostService {
  constructor() {
    this.http = createHttp("/api/post");
  }

  async createPost(payload) {
    return await this.http.post("/newpost", payload, { headers: authHeader() });
  }
  async getPosts(tags, keyword) {
    return await this.http.get(`/?tags=${tags}&keyword=${keyword}`);
  }
  async getPost(id) {
    return await this.http.get(`/${id}`);
  }
  async editPost(id, payload) {
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
  async upload(payload) {
    return await this.http.post("/upload", payload, { headers: authHeader() });
  }
}

export default new PostService();
