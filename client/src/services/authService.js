import createHttp from "@/api/index";
import authHeader from "@/services/authHeader";

class AuthService {
  constructor() {
    this.http = createHttp("/api/auth");
  }

  async getUser(payload) {
    return await this.http.get("/", payload, { headers: authHeader() });
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
