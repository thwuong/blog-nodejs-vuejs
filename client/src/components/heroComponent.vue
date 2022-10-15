<script setup>
import NavbarTop from "./NavbarTopComponent.vue";
</script>
<template>
  <div class="hero min-h-screen hero__bg">
    <div class="container">
      <navbar-top></navbar-top>
      <div class="hero__container mx-auto">
        <div class="hero__intro mt-44 w-5/12">
          <h2 class="hero__heading text-5xl text-white font-normal font-hero">
            Instant collaborations for remote teams
          </h2>
          <span
            class="hero__desc text-lg text-white font-bold font-primary leading-normal block mb-16"
          >
            All in one for your remote team chats, collaboration and track
            projects
          </span>
          <button class="hero__link text-white btn-secondary">
            <router-link to="/posts"></router-link>Link
            <font-awesome-icon icon="fa-solid fa-arrow-right" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.hero__container {
  width: 1024px;
}
</style>
