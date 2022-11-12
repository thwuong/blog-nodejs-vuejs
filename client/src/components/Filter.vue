<script>
import { ref } from "vue";
export default {
  setup(props, context) {
    const tags = ref([
      "technology",
      "entertainment",
      "law",
      "sports",
      "orther",
    ]);
    let selects = [];
    const handleSelected = (e) => {
      if (selects.some((select) => select === e.target.dataset.tag)) {
        selects = selects.filter((select) => select !== e.target.dataset.tag);
        e.target.classList.remove("active");
      } else {
        selects.push(e.target.dataset.tag);
        e.target.classList.add("active");
      }
      context.emit("select-tags", selects);
    };

    return {
      tags,
      handleSelected,
    };
  },
};
</script>
<template lang="">
  <div class="filter">
    <span
      class="filter__item"
      v-for="tag in tags"
      :data-tag="tag"
      @click="handleSelected"
    >
      {{ tag }}
    </span>
  </div>
</template>
<style lang=""></style>
