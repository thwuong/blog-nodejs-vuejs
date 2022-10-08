import { defineStore } from "pinia";
import authService from "../services/authService";
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
        const response = await authService.login(payload);
        localStorage.setItem("user", response.data.token);
        if (response.data.success) {
          this.loggedIn = response.data.success;
          return response.data;
        }
      } catch (error) {
        return error.response.data || error.message;
      }
    },
  },
});
