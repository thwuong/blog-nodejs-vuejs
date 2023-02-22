<script>
import Toast from "./components/Toast.vue";
export default {
  components: { Toast },
};
</script>
<template>
  <div class="app">
    <div class="app__container">
      <router-view></router-view>
    </div>
  </div>
  <Transition>
    <Toast />
  </Transition>
</template>

<style>
.v-enter-active,
.v-leave-active {
  transition: all ease 3s;
}
.v-enter-from,
.v-leave-to {
  @apply opacity-20 -top-16;
}
.v-enter-to,
.v-leave-form {
  @apply opacity-100 top-12;
}
</style>
