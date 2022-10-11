import { defineStore } from "pinia";
import AuthService from "../services/AuthService";
const token = JSON.parse(localStorage.getItem("user"));
export const useAuthStore = defineStore("auth", {
  state: () => {
    return {
      user: {},
      loggedIn: token ? true : false,
    };
  },
  actions: {
    async login(payload) {
      try {
        const response = await AuthService.login(payload);
        localStorage.setItem("user", JSON.stringify(response.data.token));

        if (response.data.success) {
          this.$patch({ loggedIn: response.data.success });
          return response.data;
        }
      } catch (error) {
        return error.response.data || error.message;
      }
    },
    async register(payload) {
      try {
        const response = await AuthService.register(payload);
        localStorage.setItem("user", JSON.stringify(response.data.token));
        if (response.data.success) {
          this.$patch({ loggedIn: response.data.success });
          return response.data;
        }
      } catch (error) {
        return error.response.data || error.message;
      }
    },
    async updateProfile(payload) {
      try {
        const response = await AuthService.updateProfile(payload);
        if (response.data.success) {
          return response.data;
        }
      } catch (error) {
        return error.response.data || error.message;
      }
    },
    async getProfile() {
      try {
        const response = await AuthService.getUser();
        if (response.data.success) {
          this.$patch({ user: response.data.user });
          return response.data;
        }
      } catch (error) {
        return error.response.data || error.message;
      }
    },
    logout() {
      localStorage.removeItem("user");
      this.$patch({ user: {}, loggedIn: !this.loggedIn });
    },
  },
});
