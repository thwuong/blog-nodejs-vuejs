<script>
import NavbarTop from "../components/NavbarTop.vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import { useAuthStore } from "../stores/useAuthStore.js";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import * as yup from "yup";
import { onMounted } from "vue";

export default {
  components: { Form, Field, ErrorMessage, NavbarTop },
  setup() {
    const schemaSignin = yup.object({
      username: yup.string().required().min(8),
      password: yup.string().required().min(8),
    });
    const router = useRouter();
    const { login } = useAuthStore();
    const checkLogged = () => {
      const { loggedIn } = storeToRefs(useAuthStore());
      if (loggedIn.value) {
        router.push("/posts");
      }
    };
    const handleLogin = async (values) => {
      await login({
        username: values.username,
        password: values.password,
      });
    };

    onMounted(() => {
      checkLogged();
    });
    return {
      schemaSignin,
      handleLogin,
    };
  },
};
</script>
<template lang="">
  <navbar-top :itemActive="'login'" />
  <div class="auth mt-20">
    <div class="container">
      <div class="auth__container">
        <div class="auth__signin">
          <h1 class="auth__heading">Login Account</h1>
          <span class="auth__sub">
            Please Sign in to your account to Continue with App.
          </span>
        </div>
        <Form
          v-slot="{ handleSubmit }"
          :validation-schema="schemaSignin"
          as="div"
        >
          <form class="form__auth" @submit="handleSubmit($event, handleLogin)">
            <div class="form__group">
              <label for="input-username" class="form__label">Username</label>
              <Field
                type="text"
                id="input-username"
                class="form__input"
                name="username"
                placeholder="Enter username"
                autocomplete="off"
              />
              <ErrorMessage name="username" class="text-rose-400" />
            </div>
            <div class="form__group">
              <label for="input-password" class="form__label">Password</label>
              <Field
                type="password"
                id="input-password"
                class="form__input"
                name="password"
                placeholder="Enter password"
              />
              <ErrorMessage name="password" class="text-rose-400" />
            </div>

            <button class="btn btn-primary btn-full mt-2">Sign In</button>

            <span class="form__desc">
              Don't have an account?
              <router-link to="/auth/register"
                ><span class="form__transition">Sign Up</span></router-link
              >
            </span>
          </form>
        </Form>
      </div>
    </div>
  </div>
</template>
<style>
.auth {
  width: 100%;
  margin: 0 auto;
  height: 70vh;
}
</style>
