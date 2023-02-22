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
    const timeOut = ref(null);
    const timer = 300;
    let selects = [];
    const handleSelected = (e) => {
      if (selects.some((select) => select === e.target.dataset.tag)) {
        selects = selects.filter((select) => select !== e.target.dataset.tag);
        e.target.classList.remove("active");
      } else {
        selects.push(e.target.dataset.tag);
        e.target.classList.add("active");
      }

      clearTimeout(timeOut.value);
      timeOut.value = setTimeout(() => {
        context.emit("select-tags", selects);
      }, timer);
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
