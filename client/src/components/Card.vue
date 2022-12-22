<script>
import { useAuthStore } from "../stores/useAuthStore";
import { storeToRefs } from "pinia";
export default {
  props: {
    id: String,
    title: String,
    description: String,
    image: String,
    avatar: String,
    author: String,
    favs: Array,
    votes: Array,
    dateTime: String,
    isRemove: Boolean,
    isEdit: Boolean,
  },

  setup(props, context) {
    const { userCurrent } = storeToRefs(useAuthStore());
    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    const checkActiveLike = (likes) => {
      return likes?.some((like) => like === userCurrent.value._id);
    };
    const checkActiveFav = (favs) => {
      return favs?.some((fav) => fav === userCurrent.value._id);
    };
    const handleRemovePost = (id) => {
      context.emit("remove-post", id);
    };
    const handleEditPost = (id) => {
      context.emit("edit-post", id);
    };
    const handleVotePost = (id) => {
      context.emit("vote-post", id);
    };
    const handleFavPost = (id) => {
      context.emit("fav-post", id);
    };
    return {
      props,
      options,
      handleEditPost,
      handleRemovePost,
      handleVotePost,
      handleFavPost,
      checkActiveLike,
      checkActiveFav,
    };
  },
};
</script>

<template>
  <div class="card">
    <router-link :to="`/post/${props.id}`">
      <div class="card__img">
        <img :src="props.image" class="card__img-src" />
      </div>
    </router-link>
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
    <div class="card__controls" v-else>
      <div class="card__status">
        <span
          :class="[
            'card__status-fav',
            checkActiveFav(props.favs) ? 'active' : '',
          ]"
          @click="handleFavPost(props.id)"
        >
          {{ props.favs.length > 0 ? props.favs.length : "" }}
          <font-awesome-icon icon="fa-solid fa-heart" />
        </span>
        <span
          :class="[
            'card__status-like',
            checkActiveLike(props.votes) ? 'active' : '',
          ]"
          @click="handleVotePost(props.id)"
        >
          {{ props.votes.length > 0 ? props.votes.length : "" }}
          <font-awesome-icon icon="fa-solid fa-thumbs-up" />
        </span>
      </div>
    </div>
  </div>
</template>
<style></style>
