import { defineStore } from "pinia";
import AuthService from "../services/AuthService";
const user = JSON.parse(localStorage.getItem("user")) || null;
export const useUserStore = defineStore("user", {
  state: () => {
    return {
      user: user,
      loggedIn: user ? true : false,
    };
  },
  getters: {
    getUser(state) {
      return state.user;
    },
    isLogged(state) {
      return state.loggedIn;
    },
  },
  actions: {
    async login(payload) {
      try {
        const response = await AuthService.login(payload);
        localStorage.setItem("user", response.data.token);
        if (response.data.success) {
          this.loggedIn = response.data.success;
          return response.data;
        }
      } catch (error) {
        return error.response.data || error.message;
      }
    },
    async register(payload) {
      try {
        const response = await AuthService.register(payload);
        localStorage.setItem("user", response.data.token);
        if (response.data.success) {
          this.loggedIn = response.data.success;
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
          this.loggedIn = response.data.success;
          return response.data;
        }
      } catch (error) {
        return error.response.data || error.message;
      }
    },
    logout() {
      localStorage.removeItem("user");
      this.loggedIn = !this.loggedIn;
    },
  },
});
