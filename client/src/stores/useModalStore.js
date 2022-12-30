import { defineStore } from "pinia";

export const useModalStore = defineStore("Modal", {
  state: () => {
    return {
      showModal: false,
      nameModal: "",
    };
  },
  actions: {
    setModal() {
      this.showModal = true;
    },
    removeModal() {
      this.showModal = false;
    },
  },
});
