<script setup>
import PostHighlightComponent from "@/components/PostHighlightComponent.vue";
</script>
<template>
  <div class="content mt-40">
    <div class="container">
      <div class="content__container mx-auto">
        <div class="posts__highlight">
          <post-highlight-component />
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.content__container {
  width: 1024px;
}
</style>
