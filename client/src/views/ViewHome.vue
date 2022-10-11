<script setup>
import { useAuthStore } from "@/stores/useAuthStore.js";
import { storeToRefs } from "pinia";
import heroComponent from "@/components/heroComponent.vue";
const { login } = useAuthStore();
const { userCurrent, loggedIn } = storeToRefs(useAuthStore());
</script>
<template>
  <div class="w-full">
    <heroComponent />
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: {
        username: "",
        password: "",
      },
    };
  },
  methods: {},
};
</script>
<style></style>
