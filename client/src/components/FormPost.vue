<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { ref, toRef } from "vue";

export default {
  props: { postSelected: { type: Object }, isEdit: { type: Boolean } },
  components: { Form, Field, ErrorMessage },
  setup(props, context) {
    const schemaPost = yup.object({
      title: yup.string().required().min(15).max(120),
      description: yup.string().max(255),
      body: yup.string(),
      image: yup.string(),
      tags: yup.string(),
      author: yup.string(),
    });

    const fileUpload = ref({});
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
    const editPost = (values) => {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("body", values.body);
      formData.append("image", fileUpload.value);
      formData.append("tags", values.tags);
      context.emit("edit-post", formData);
    };
    const handldeSelect = (event) => {
      fileUpload.value = event.target.files[0];
      console.log(fileUpload.value);
    };

    return {
      schemaPost,
      props,
      tags,
      createPost,
      handldeSelect,
      editPost,
    };
  },
};
</script>
<template>
  <Form as="div" v-slot="{ handleSubmit }" :validation-schema="schemaPost">
    <form
      class="form__post"
      @submit="
        !isEdit
          ? handleSubmit($event, createPost)
          : handleSubmit($event, editPost)
      "
    >
      <div class="form__group">
        <label for="title" class="form__label">Title</label>
        <Field
          type="text"
          id="title"
          class="form__input"
          name="title"
          placeholder="Enter title"
          v-model="props.postSelected.title"
        />
        <ErrorMessage name="title" class="text-rose-400" />
      </div>
      <div class="form__group">
        <label for="description" class="form__label">Description</label>
        <Field
          type="text"
          id="description"
          class="form__input"
          name="description"
          placeholder="Enter Description"
          v-model="props.postSelected.description"
        />
        <ErrorMessage name="description" class="text-rose-400" />
      </div>
      <div class="form__group">
        <label for="body" class="form__label">Body</label>
        <Field
          class="form__input"
          name="body"
          id="body"
          as="textarea"
          v-model="props.postSelected.body"
        >
        </Field>
        <ErrorMessage name="body" class="text-rose-400" />
      </div>
      <div class="form__select">
        <div class="form__group">
          <label for="file" class="form__label">Image</label>
          <Field name="file">
            <input type="file" @change="handldeSelect" multiple />
          </Field>
          <ErrorMessage name="file" class="text-rose-400" />
        </div>
        <div class="form__group" v-if="isEdit">
          <label for="file" class="form__label">Image Old</label>
          <div class="form__img-old">
            <img :src="props.postSelected.image" />
          </div>
        </div>
        <div class="form__group">
          <label for="tags" class="form__label">tags</label>
          <Field
            name="tags"
            as="select"
            class="form__input"
            v-model="props.postSelected.tags"
          >
            <option :value="tag" v-for="tag in tags">
              {{ tag }}
            </option>
          </Field>
          <ErrorMessage name="tags" class="text-rose-400" />
        </div>
      </div>
      <div class="form__control">
        <button class="btn btn-primary" v-if="!isEdit">Create Post</button>
        <button class="btn btn-save" v-else>Save Change</button>
        <router-link :to="'/posts'"
          ><span class="btn btn-cancel">Cancel</span></router-link
        >
      </div>
    </form>
  </Form>
</template>
<style></style>
