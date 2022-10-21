<script>
import NavbarTopComponent from "@/components/NavbarTopComponent.vue";

export default {
  components: { NavbarTopComponent },
  setup() {
    return {};
  },
};
</script>
<template>
  <navbar-top-component :itemActive="'contact'" />
  <div>
    {{ $route.params.id }}
  </div>
</template>
<style></style>
