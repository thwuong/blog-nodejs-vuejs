import createHttp from "@/api/index";
import authHeader from "@/services/authHeader";

class blogService {
  constructor() {
    this.http = createHttp("/api/blog");
  }

  async createBlog(payload) {
    return await this.http.post("/newBlog", payload, { headers: authHeader() });
  }
  async getsBlog() {
    return await this.http.get("/");
  }
  async getBlog(id) {
    return await this.http.get(`/${id}`);
  }
  async editBlog(payload, id) {
    return await this.http.put(`/${id}/edit`, payload, {
      headers: authHeader(),
    });
  }
  async removeBlog(id) {
    return await this.http.delete(`/${id}/delete`, { headers: authHeader() });
  }
  async handlerLike(id) {
    return await this.http.put(`/${id}/like`, { headers: authHeader() });
  }
  async handlerFavorite(id) {
    return await this.http.put(`/${id}/favorite`, { headers: authHeader() });
  }
}

export default new blogService();
