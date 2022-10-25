<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { ref } from "vue";

export default {
  props: { authorCurrent: { type: String } },
  components: { Form, Field, ErrorMessage },
  setup(props, context) {
    const fileUpload = ref({});
    const schemaPost = yup.object({
      title: yup.string().required().min(15).max(120),
      description: yup.string().max(255),
      body: yup.string(),
      image: yup.string(),
      tags: yup.string(),
      author: yup.string(),
    });
    const tags = ["technology", "entertainment", "law", "sports", "orther"];

    const createPost = (values) => {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("body", values.body);
      formData.append("image", fileUpload.value);
      formData.append("tags", values.tags);
      context.emit("create-post", formData);
    };
    const handldeSelect = (event) => {
      fileUpload.value = event.target.files[0];
    };
    return {
      schemaPost,
      props,
      tags,
      createPost,
      handldeSelect,
    };
  },
};
</script>
<template>
  <Form as="div" v-slot="{ handleSubmit }" :validation-schema="schemaPost">
    <form class="form__post" @submit="handleSubmit($event, createPost)">
      <div class="form__control">
        <label for="title" class="form__label">Title</label>
        <Field
          type="text"
          id="title"
          class="form__input"
          name="title"
          placeholder="Enter title"
        />
        <ErrorMessage name="title" class="text-rose-400" />
      </div>
      <div class="form__control">
        <label for="desc" class="form__label">Description</label>
        <Field
          type="text"
          id="desc"
          class="form__input"
          name="desc"
          placeholder="Enter Description"
        />
        <ErrorMessage name="desc" class="text-rose-400" />
      </div>
      <div class="form__control">
        <label for="body" class="form__label">Body</label>
        <Field class="form__input" name="body" id="body" as="textarea"> </Field>
        <ErrorMessage name="body" class="text-rose-400" />
      </div>
      <div class="form__select">
        <div class="form__control">
          <label for="file" class="form__label">Image</label>
          <Field name="file">
            <input type="file" @change="handldeSelect" multiple />
          </Field>
          <ErrorMessage name="file" class="text-rose-400" />
        </div>
        <div class="form__control">
          <label for="tags" class="form__label">tags</label>
          <Field name="tags" as="select" class="form__input">
            <option value="" disabled>Select a tag</option>
            <option :value="tag" v-for="tag in tags">
              {{ tag }}
            </option>
          </Field>
          <ErrorMessage name="tags" class="text-rose-400" />
        </div>
      </div>
      <button class="btn-primary">Create Post</button>
    </form>
  </Form>
</template>
<style></style>
