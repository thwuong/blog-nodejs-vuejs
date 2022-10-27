<script>
import NavbarTop from "@/components/NavbarTop.vue";
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import { useAuthStore } from "@/stores/useAuthStore.js";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";

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
  components: { Form, Field, ErrorMessage, NavbarTop },
  setup() {
    const router = useRouter();
    const { register } = useAuthStore();

    const checkLogged = () => {
      const { loggedIn } = storeToRefs(useAuthStore());
      if (loggedIn.value) {
        router.push("/posts");
      }
    };
    checkLogged();
    const handleRegister = async (values) => {
      const { success, message } = await register({
        username: values.username,
        password: values.password,
        comfirmPassword: values.comfirmPassword,
      });
      if (success) {
        router.push("/posts");
      } else {
        alert(message);
      }
    };
    return {
      schemaSignup,
      router,
      handleRegister,
    };
  },
};
</script>
<template>
  <navbar-top :itemActive="'register'" />
  <div class="auth mt-20">
    <div class="container">
      <div class="auth__container">
        <div class="auth__signup">
          <h1 class="auth__heading">Sign Up</h1>
          <span class="auth__sub">
            Please Sign up to your account to Continue with App.</span
          >
        </div>
        <Form
          v-slot="{ handleSubmit }"
          :validation-schema="schemaSignup"
          as="div"
        >
          <form
            class="form__auth"
            @submit="handleSubmit($event, handleRegister)"
          >
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
            <div class="form__group">
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
            <button class="btn btn-primary btn-full mt-2">Sign Up</button>
            <span class="form__desc">
              Already have an account
              <router-link to="/auth/login"
                ><span class="form__transition">Sign In</span></router-link
              >
            </span>
          </form>
        </Form>
      </div>
    </div>
  </div>
</template>
<style></style>
