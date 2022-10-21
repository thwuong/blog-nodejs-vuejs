import { defineStore } from "pinia";
import AuthService from "../services/AuthService";
const token = JSON.parse(localStorage.getItem("user"));
const timeResetToken = Date.now() + 60 * 60 * 1000;
export const useAuthStore = defineStore("auth", {
  state: () => {
    return {
      userCurrent: {},
      loggedIn: token ? true : false,
    };
  },
  getters: {
    getCurrentUser(state) {
      return state.userCurrent;
    },
    getLoggedIn(state) {
      return state.loggedIn;
    },
  },
  actions: {
    async login(payload) {
      try {
        const response = await AuthService.login(payload);
        localStorage.setItem(
          "user",
          JSON.stringify(response.data.token),
          timeResetToken
        );

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
        localStorage.setItem(
          "user",
          JSON.stringify(response.data.token),
          timeResetToken
        );
        if (response.data.success) {
          this.loggedIn = response.data.success;
          // this.userCurrent = response.data.token;
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
          this.userCurrent = response.data.user;
          return response.data;
        }
      } catch (error) {
        return error.response.data || error.message;
      }
    },
    logout() {
      localStorage.removeItem("user");
      this.$patch({ userCurrent: {}, loggedIn: !this.loggedIn });
    },
  },
});
