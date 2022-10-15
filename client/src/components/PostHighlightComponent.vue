<script setup>
const props = defineProps({
  title: String,
  description: String,
  image: String,
});
</script>
<template>
  <div class="post__highlight">
    <div class="post__content">
      <h2 class="post__title">{{ title }}</h2>
      <span class="post__desc">
        {{ description }}
      </span>
      <button class="btn-secondary text-blue-500">
        <router-link to="/posts/"
          >Details
          <font-awesome-icon icon="fa-solid fa-arrow-right" />
        </router-link>
      </button>
    </div>
    <div class="post__img">
      <img :src="image" :alt="title" />
    </div>
  </div>
</template>
