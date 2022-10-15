<script setup>
import { useAuthStore } from "@/stores/useAuthStore.js";
import { storeToRefs } from "pinia";
import HeroComponent from "@/components/heroComponent.vue";
import ContentComponent from "@/components/ContentComponent.vue";
const { login } = useAuthStore();
const { userCurrent, loggedIn } = storeToRefs(useAuthStore());
</script>
<template>
  <div class="w-full">
    <hero-component />
    <content-component />
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
