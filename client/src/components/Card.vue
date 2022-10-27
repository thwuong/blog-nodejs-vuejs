<script>
export default {
  props: {
    id: String,
    title: String,
    description: String,
    image: String,
    avatar: String,
    author: String,
    dateTime: String,
    isRemove: Boolean,
    isEdit: Boolean,
  },

  setup(props, context) {
    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    const handleRemovePost = (id) => {
      context.emit("remove-post", id);
    };
    const handleEditPost = (id) => {
      context.emit("edit-post", id);
    };
    return {
      props,
      options,
      handleEditPost,
      handleRemovePost,
    };
  },
};
</script>

<template>
  <div class="card">
    <div class="card__img">
      <img :src="props.image" class="card__img-src" />
    </div>
    <div class="card__body">
      <h2 class="card__title">{{ props.title }}</h2>
      <span class="card__sub">
        {{ props.description }}
      </span>
    </div>
    <div class="card__author" v-if="props.author">
      <div class="card__avatar">
        <img :src="props.avatar" />
      </div>
      <span class="card__author-name">{{ props.author }}</span>
      <span class="card__datetime">{{
        new Date(props.dateTime).toLocaleDateString("en-US", options)
      }}</span>
    </div>
    <div class="card__controls" v-if="props.isRemove && props.isEdit">
      <router-link :to="`/post/${props.id}/edit`">
        <span class="card-control__item card-control__item-edit">
          <font-awesome-icon icon="fa-solid fa-pen" />
          Edit
        </span>
      </router-link>
      <span
        class="card-control__item card-control__item-remove"
        @click="handleRemovePost(props.id)"
      >
        <font-awesome-icon icon="fa-solid fa-trash" />
        Remove
      </span>
    </div>
  </div>
</template>
<style></style>
