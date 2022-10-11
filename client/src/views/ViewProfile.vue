<script setup>
import { useAuthStore } from "@/stores/useAuthStore.js";
import { storeToRefs } from "pinia";
import { computed, ref } from "vue";
const { user } = storeToRefs(useAuthStore());
const { getProfile } = useAuthStore();
getProfile();
</script>
<template>
  <div>
    <h1>{{ user.username }}</h1>
  </div>
</template>
<style></style>
