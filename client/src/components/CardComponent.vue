<template>
  <div class="card">
    <div class="card__img">
      <img src="../assets/images/Rectangle.png" alt="" class="card__img-src" />
    </div>
    <div class="card__body">
      <h2 class="card__title">The Emotional Toll of Being in UX</h2>
      <span class="card__sub">
        There are times when our work impacts us deeply — sometimes in ways we
        neither acknowledge nor understand
      </span>
    </div>
    <div class="card__author">
      <div class="card__avatar">
        <img src="../assets/images/Avatar.png" alt="" />
      </div>
      <span class="card__author-name">Wade Warren</span>
      <span class="card__datetime">2nd JanuaJay, 2022</span>
    </div>
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
