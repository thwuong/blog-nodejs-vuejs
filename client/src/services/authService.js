import createHttp from "../api/index";
import authHeader from "./authHeader";

class AuthService {
  constructor() {
    this.http = createHttp("/api/auth");
  }

  async getUser() {
    return await this.http.get("/", { headers: authHeader() });
  }
  async login(payload) {
    return await this.http.post("/login", payload);
  }
  async register(payload) {
    return await this.http.post("/register", payload);
  }
  async updateProfile(payload) {
    return await this.http.put("/setting", payload, { headers: authHeader() });
  }
}

export default new AuthService();
