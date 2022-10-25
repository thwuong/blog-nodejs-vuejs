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
      <img :src="props.image" :alt="props.title" class="card__img-src" />
    </div>
    <div class="card__body">
      <h2 class="card__title">{{ props.title }}</h2>
      <span class="card__sub">
        {{ props.description }}
      </span>
    </div>
    <div class="card__author">
      <div class="card__avatar">
        <img :src="props.avatar" :alt="props.author" />
      </div>
      <span class="card__author-name">{{ props.author }}</span>
      <span class="card__datetime">{{
        new Date(props.dateTime).toLocaleDateString("en-US", options)
      }}</span>
    </div>
  </div>
</template>
<style></style>
