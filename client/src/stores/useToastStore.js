import { defineStore } from "pinia";

export const useToast = defineStore("Toast", {
  state: () => {
    return {
      isToast: true,
      message: "",
      success: false,
    };
  },
  actions: {
    setToast(newToast) {
      this.isToast = true;
      this.message = newToast.message;
      this.success = newToast.success;

      setTimeout(() => {
        this.removeToast();
      }, 2500);
    },
    removeToast() {
      this.isToast = false;
      this.message = "";
      this.success = false;
    },
  },
});
