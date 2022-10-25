<script>
import NavbarTop from "@/components/NavbarTop.vue";

export default {
  components: { NavbarTop },
  setup() {
    return {};
  },
};
</script>
<template>
  <navbar-top :itemActive="'contact'" />
  <div>
    {{ $route.params.id }}
  </div>
</template>
<style></style>
