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
  <Toast />
</template>

<style></style>
