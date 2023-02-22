<script>
import { ref } from "vue";
export default {
  setup(props, context) {
    const isClear = ref(false);
    const keyword = ref("");
    let timer = 300;
    const timeOut = ref(null);

    const searchPosts = (e) => {
      const keyWord = e.target.value;
      clearTimeout(timeOut.value);
      timeOut.value = setTimeout(() => {
        isClear.value = keyWord ? true : false;
        context.emit("search-posts", keyWord);
      }, timer);
    };

    const clearContentSearch = (e) => {
      keyword.value = "";
      isClear.value = false;

      context.emit("clear-content", keyword.value);
    };

    return {
      searchPosts,
      clearContentSearch,
      isClear,
      keyword,
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
      v-model="keyword"
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
