<script>
import { ref } from "vue";
export default {
  setup(props, context) {
    const isClear = ref(false);
    const searchPosts = (e) => {
      const keyWord = e.target.value;
      isClear.value = keyWord ? true : false;
      context.emit("search-posts", keyWord);
    };
    const clearContentSearch = (e) => {
      const elSearch = document.querySelector(".search__input");
      elSearch.value = "";
      isClear.value = false;

      context.emit("clear-content", elSearch.value);
    };

    return {
      searchPosts,
      clearContentSearch,
      isClear,
    };
  },
};
</script>
<template>
  <div class="search">
    <input
      type="text"
      class="search__input"
      placeholder="search posts....."
      name="keyword"
      @keyup="searchPosts"
    />
    <div class="search__clear" v-if="isClear" @click="clearContentSearch">
      <font-awesome-icon icon="fa-solid fa-xmark" />
    </div>
    <span class="search__icon">
      <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
    </span>
  </div>
</template>
<style></style>
