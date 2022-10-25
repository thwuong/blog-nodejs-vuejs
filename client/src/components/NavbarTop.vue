<script>
import { useAuthStore } from "@/stores/useAuthStore.js";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";
export default {
  props: {
    itemActive: String,
    username: String,
    avatar: String,
  },
  setup(props) {
    const classActive = ref("text-orange-400");
    const { loggedIn } = storeToRefs(useAuthStore());
    const showDropdown = ref(false);
    const router = useRouter();
    return {
      props,
      classActive,
      loggedIn,
      showDropdown,
      router,
    };
  },
  methods: {
    handleLogout() {
      const { logout } = useAuthStore();
      logout();
      this.router.push("/posts");
    },
  },
};
</script>
<template>
  <div class="navbar mx-auto mt-7">
    <div class="container">
      <div class="flex justify-between items-center">
        <div class="navbar__logo">
          <router-link to="/">
            <img src="../assets/images/logo.svg" alt="logo" class="w-full" />
          </router-link>
        </div>
        <ul class="navbar__menu flex gap-6 items-center">
          <li
            :class="[
              props.itemActive == 'posts' ? classActive : '',
              'navbar__item',
              'hover:text-blue-500',
            ]"
          >
            <router-link to="/posts">Posts</router-link>
          </li>
          <li
            :class="[
              props.itemActive == 'categories' ? classActive : '',
              'navbar__item',
              'hover:text-blue-500',
            ]"
          >
            <router-link to="/products">Categories</router-link>
          </li>
          <li
            :class="[
              props.itemActive == 'contact' ? classActive : '',
              'navbar__item',
              'hover:text-blue-500',
            ]"
          >
            <router-link to="/products">Contact</router-link>
          </li>
          <li class="navbar__item flex gap-3 items-center" v-if="!loggedIn">
            <router-link to="/auth/login"
              ><span
                :class="[
                  'btn-primary',
                  props.itemActive == 'login' ? classActive : '',
                ]"
                >Login</span
              ></router-link
            >
            <router-link to="/auth/register"
              ><span
                :class="[
                  'btn-secondary',
                  props.itemActive == 'register' ? classActive : '',
                ]"
                >Register</span
              ></router-link
            >
          </li>
          <li class="navbar__item" v-if="loggedIn">
            <div class="navbar__profile">
              <div class="navbar__avatar">
                <img :src="props.avatar" :alt="props.username" />
              </div>
              <span class="navbar__auth">{{ props.username }}</span>
              <span class="dropdown relative">
                <font-awesome-icon
                  icon="fa-solid fa-caret-up"
                  @click="showDropdown = !showDropdown"
                  :class="[
                    'w-6',
                    'h-12',
                    'cursor-pointer',
                    showDropdown
                      ? ' ease-out duration-300 rotate-180'
                      : 'ease-out duration-300 rotate-360',
                  ]"
                />
                <ul
                  class="dropdown__sub absolute top-14 w-48 right-[-4px] shadow-2xl shadow-gray-500"
                  v-if="showDropdown"
                >
                  <li
                    class="dropdown__item py-2 px-4 hover:text-orange-400 cursor-pointer"
                  >
                    <router-link to="/auth/profile">Update Profile</router-link>
                  </li>
                  <li
                    class="dropdown__item py-2 px-4 hover:text-orange-400 cursor-pointer"
                    @click="handleLogout"
                  >
                    Logout
                  </li>
                </ul>
              </span>
            </div>
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
