import { defineStore } from "pinia";
import { useToast } from "./useToastStore";
import AuthService from "../services/AuthService.js";
const token = JSON.parse(localStorage.getItem("user"));

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
      const { setToast } = useToast();

      try {
        const response = await AuthService.login(payload);
        localStorage.setItem("user", JSON.stringify(response.data.token));

        if (response.data.success) {
          this.loggedIn = response.data.success;
          this.router.push({ name: "ViewPosts" });
          setToast(response.data);
        }
      } catch (error) {
        setToast(error.response.data);
      }
    },
    async register(payload) {
      const { setToast } = useToast();

      try {
        const response = await AuthService.register(payload);
        localStorage.setItem("user", JSON.stringify(response.data.token));
        if (response.data.success) {
          this.loggedIn = response.data.success;
          this.router.push({ name: "ViewPosts" });
          setToast(response.data);
        }
      } catch (error) {
        setToast(error.response.data);
      }
    },
    async updateProfile(payload) {
      const { setToast } = useToast();

      try {
        const response = await AuthService.updateProfile(payload);
        if (response.data.success) {
          setToast(response.data);
        }
      } catch (error) {
        setToast(error.response.data);
      }
    },
    async getProfile() {
      const { setToast } = useToast();

      try {
        const response = await AuthService.getUser();
        if (response.data.success) {
          this.userCurrent = response.data.user;
        }
      } catch (error) {
        setToast(error.response.data);
      }
    },
    logout() {
      const { setToast } = useToast();

      localStorage.removeItem("user");
      this.userCurrent = {};
      this.loggedIn = !this.loggedIn;
      setToast({ success: true, message: "Logouted successfully!" });
    },
  },
});
