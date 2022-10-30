<script>
import { ref } from "vue";
export default {
  setup(props, context) {
    const tags = ref([
      "all",
      "technology",
      "entertainment",
      "law",
      "sports",
      "orther",
    ]);
    let selects = [];
    const handleSelect = (e) => {
      if (selects.some((select) => select === e.target.dataset.tag)) {
        selects = selects.filter((select) => select !== e.target.dataset.tag);
        e.target.classList.remove("active");
      } else {
        selects.push(e.target.dataset.tag);
        e.target.classList.add("active");
      }
      checkSelectAll();
    };
    const checkSelectAll = () => {
      const elsActive = document.querySelectorAll(".filter__item.active");
      const els = document.querySelectorAll(".filter__item");
      elsActive.forEach((el) => {
        if (el.dataset.tag === "all") {
          els.forEach((el) => {
            el.classList.add("active");
          });
        }
      });
    };

    return {
      tags,
      handleSelect,
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
      @click="handleSelect"
    >
      {{ tag }}
    </span>
  </div>
</template>
<style lang=""></style>
