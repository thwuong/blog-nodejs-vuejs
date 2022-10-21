<script>
export default {
  props: {
    title: String,
    description: String,
    image: String,
    avatar: String,
    author: String,
    dateTime: String,
  },

  setup(props) {
    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return {
      props,
      options,
    };
  },
};
</script>

<template>
  <div class="card">
    <div class="card__img">
      <img :src="image" alt="" class="card__img-src" />
    </div>
    <div class="card__body">
      <h2 class="card__title">{{ title }}</h2>
      <span class="card__sub">
        {{ description }}
      </span>
    </div>
    <div class="card__author">
      <div class="card__avatar">
        <img :src="author" alt="" />
      </div>
      <span class="card__author-name">{{ author }}</span>
      <span class="card__datetime">{{
        new Date(dateTime).toLocaleDateString("en-US", options)
      }}</span>
    </div>
  </div>
</template>
<style></style>
