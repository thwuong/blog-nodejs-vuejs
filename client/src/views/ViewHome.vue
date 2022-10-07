<template>
  <div>
    <h1>Home page</h1>
  </div>
</template>
<script>
import { useUserStore } from "@/stores/index";
import { computed } from "vue";
export default {
  setup() {
    const userStore = useUserStore();
    const { user } = userStore;

    return {
      user,
      isLogged: computed(() => userStore.isLogged),
    };
  },
};
</script>
<style></style>
