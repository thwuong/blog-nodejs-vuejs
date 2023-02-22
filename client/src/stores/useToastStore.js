import { defineStore } from "pinia";

export const useToast = defineStore("Toast", {
  state: () => {
    return {
      isToast: false,
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
      }, 2000);
    },
    removeToast() {
      this.isToast = false;
      this.message = "";
      this.success = false;
    },
  },
});
