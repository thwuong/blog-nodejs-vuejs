<script>
import * as yup from "yup";
import { ref } from "vue";
import { Form as VeeForm, Field, ErrorMessage } from "vee-validate";
import { useAuthStore } from "@/stores/useAuthStore.js";
import { useRouter } from "vue-router";
const schemaSignin = yup.object({
  username: yup.string().required().min(8),
  password: yup.string().required().min(8),
});
const schemaSignup = yup.object({
  username: yup.string().required().min(8),
  password: yup.string().required().min(8),
  comfirmPassword: yup
    .string()
    .required()
    .min(8)
    .oneOf([yup.ref("password")], "Password's not match"),
});
export default {
  components: { VeeForm, Field, ErrorMessage },
  setup() {
    const state = ref("signin");
    const router = useRouter();
    const { login, register } = useAuthStore();

    return {
      state,
      schemaSignin,
      schemaSignup,
      login,
      register,
      router,
    };
  },
  methods: {
    async login(values) {
      const { success, message } = await this.login({
        username: values.username,
        password: values.password,
      });
      if (success) {
        this.router.push("/posts");
      } else {
        alert(message);
      }
    },
    async register(values) {
      const { success, message } = await this.register({
        username: values.username,
        password: values.password,
        comfirmPassword: values.comfirmPassword,
      });
      if (success) {
        this.router.push("/posts");
      } else {
        alert(message);
      }
    },
  },
};
</script>
<template>
  <div class="auth__signin" v-if="state == 'signin'">
    <h1 class="auth__heading">Login Account</h1>
    <span class="auth__sub">
      Please Sign in to your account to Continue with App.
    </span>
  </div>
  <div class="auth__signup" v-if="state == 'signup'">
    <h1 class="auth__heading">Sign Up</h1>
    <span class="auth__sub">
      Please Sign up to your account to Continue with App.</span
    >
  </div>
  <VeeForm
    v-slot="{ handleSubmit }"
    :validation-schema="state == 'signin' ? schemaSignin : schemaSignup"
    as="div"
  >
    <form
      class="form"
      @submit="
        state == 'signin'
          ? handleSubmit($event, login)
          : handleSubmit($event, register)
      "
    >
      <div class="form__control">
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
      <div class="form__control">
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
      <div class="form__control" v-if="state == 'signup'">
        <label for="input-comfirmpassword" class="form__label"
          >Comfirm Password</label
        >
        <Field
          type="password"
          id="input-comfirmpassword"
          class="form__input"
          name="comfirmPassword"
          placeholder="Enter comfirm password"
        />
        <ErrorMessage name="comfirmPassword" class="text-rose-400" />
      </div>
      <button class="btn-primary btn-full mt-2" v-if="state == 'signin'">
        Sign In
      </button>
      <button class="btn-primary btn-full mt-2" v-if="state == 'signup'">
        Sign Up
      </button>

      <span class="form__desc" v-if="state == 'signin'">
        Don't have an account?
        <span class="form__transition" @click="state = 'signup'">Sign Up</span>
      </span>
      <span class="form__desc" v-if="state == 'signup'">
        Already have an account
        <span class="form__transition" @click="state = 'signin'">Sign In</span>
      </span>
    </form>
  </VeeForm>
</template>
<style></style>
