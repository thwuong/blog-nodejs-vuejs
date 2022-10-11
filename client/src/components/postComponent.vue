<template>
  <div class="post">
    <h1 class="post__title">{{ title }}</h1>
    <div class="post__body">{{ body }}</div>
    <img :src="`/image/${image}`" :alt="title" class="post__img" />
    <button>{{ author }}</button>
  </div>
</template>
<script>
export default {
  props: {
    title: String,
    body: String,
    image: String,
    author: String,
  },
};
</script>
<style></style>
