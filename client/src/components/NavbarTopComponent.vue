<script setup>
const islogged = false;
</script>
<template>
  <div class="navbar mx-auto py-4">
    <div class="container">
      <div class="flex justify-between items-center">
        <div class="navbar__logo">
          <router-link to="/">
            <img src="../assets/images/logo.svg" alt="logo" class="w-full" />
          </router-link>
        </div>
        <ul class="navbar__menu flex gap-6">
          <li class="navbar__item hover:text-blue-500">
            <router-link to="/products">Products</router-link>
          </li>
          <li class="navbar__item hover:text-blue-500">
            <router-link to="/products">Services</router-link>
          </li>
          <li class="navbar__item hover:text-blue-500">
            <router-link to="/products">Contact</router-link>
          </li>
          <li class="navbar__item flex gap-3 items-center" v-if="!islogged">
            <router-link to="/products"
              ><span class="btn-primary">Login</span></router-link
            >
            <router-link to="/products"
              ><span class="btn-secondary">Register</span></router-link
            >
          </li>
          <li class="navbar__item" v-if="islogged">
            <router-link to="/products">Profile</router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<style>
.navbar {
  width: 1024px;
}
.navbar__logo {
  width: 80px;
}
</style>
