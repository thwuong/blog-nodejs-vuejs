<template>
  <!-- Main modal -->

  <div
    v-if="showModal"
    id="defaultModal"
    tabindex="-1"
    class="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full"
  >
    <div class="relative w-full mx-auto mt-8 h-full max-w-2xl md:h-auto">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <!-- Modal header -->
        <div
          class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600"
        >
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            Update profile
          </h3>
          <button
            @click="removeModal"
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-toggle="defaultModal"
          >
            <svg
              aria-hidden="true"
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <!-- Modal body -->
        <div class="p-6 space-y-6">
          <Form :validation-schema="userSchema" @submit="handlerSubmit">
            <div class="relative z-0 mb-6 w-full group">
              <Field
                type="text"
                name="username"
                id="username"
                v-model="userCurrent.username"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                for="username"
                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >Username</label
              >
              <ErrorMessage class="text-rose-400" name="username" />
            </div>
            <div class="relative z-0 mb-6 w-full group">
              <Field
                type="email"
                name="email"
                id="email"
                v-model="userCurrent.email"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                for="email"
                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >Email</label
              >
              <ErrorMessage class="text-rose-400" name="email" />
            </div>
            <div class="relative z-0 mb-6 w-full group">
              <label
                class="block mb-2 text-sm text-gray-500 dark:text-white"
                for="small_size"
                >Avatar</label
              >
              <Field
                name="file"
                v-slot="{ handleChange }"
                :value="userCurrent.avatar"
              >
                <input
                  class="block w-full mb-5 text-xs text-gray-900 p-2 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  id="small_size"
                  type="file"
                  @change="handleChange"
                />
              </Field>
              <ErrorMessage class="text-rose-400" name="file" />
            </div>
            <div
              class="flex items-center pt-3 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600"
            >
              <button
                type="submit"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                I accept
              </button>
              <button
                @click="removeModal"
                data-modal-toggle="defaultModal"
                type="button"
                class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              >
                Decline
              </button>
            </div>
          </Form>
        </div>
        <!-- Modal footer -->
      </div>
    </div>
  </div>
</template>
<script>
import { storeToRefs } from "pinia";
import { useModalStore } from "@/stores/useModalStore.js";
import { useAuthStore } from "../stores/useAuthStore";
import { Form, ErrorMessage, Field } from "vee-validate";
import * as yup from "yup";
export default {
  components: { Form, ErrorMessage, Field },
  setup() {
    const { showModal } = storeToRefs(useModalStore());
    const { removeModal } = useModalStore();
    const { userCurrent } = storeToRefs(useAuthStore());
    const { updateProfile } = useAuthStore();
    const userSchema = yup.object({
      username: yup.string().min(6).required("don't empty"),
      email: yup.string().email(),
      file: yup.string(),
    });
    const handlerSubmit = async (data) => {
      const formData = new FormData();
      formData.append("username", data.username);
      formData.append("email", data.email);
      formData.append("avatar", data.file);

      await updateProfile(formData);
      removeModal();
    };
    return { showModal, removeModal, userSchema, handlerSubmit, userCurrent };
  },
};
</script>
