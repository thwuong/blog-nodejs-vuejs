import { defineStore } from "pinia";
import { computed, ref } from "vue";

const userLocalstorage = localStorage.getItem("user") || null;

export const useUserStore = defineStore("user", () => {
  const user = ref(userLocalstorage);
  const isLogged = computed(() => userLocalstorage !== null);

  return {
    user,
    isLogged,
  };
});
