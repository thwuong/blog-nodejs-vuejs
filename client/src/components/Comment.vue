<template>
  <div
    class="flex mx-auto items-center justify-center shadow-lg mt-11 mx-8 mb-4"
  >
    <div class="w-full bg-white rounded-lg px-4 pt-2">
      <div class="flex flex-wrap -mx-3 mb-6">
        <h2 class="px-4 pt-3 pb-2 text-gray-800 text-lg">Add a new comment</h2>
        <div class="w-full md:w-full px-3 mb-2 mt-2">
          <textarea
            class="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
            name="body"
            placeholder="Type Your Comment"
            :value="body"
            required
            @change="
              (e) => {
                body = e.target.value;
              }
            "
          ></textarea>
        </div>
        <div class="w-full md:w-full flex items-start md:w-full px-3">
          <div class="ml-auto">
            <button class="btn btn-primary" @click="handleSubmit">
              Post Comment
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";

export default {
  setup(props, context) {
    const body = ref("");
    const handleSubmit = () => {
      context.emit("post-comment", body.value);
      body.value = "";
    };
    return {
      handleSubmit,
      body,
    };
  },
};
</script>
<style></style>
