<script>
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import ImageUploader from "quill-image-uploader";
import BlotFormatter from "quill-blot-formatter";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { ref, onMounted } from "vue";

export default {
  props: {
    postSelected: { type: Object, default: {} },
    isEdit: { type: Boolean },
  },
  components: { Form, Field, ErrorMessage, QuillEditor },
  setup(props, context) {
    const content = ref("");
    const fileUpload = ref({});
    const quill = ref(null);
    const tags = ["technology", "entertainment", "law", "sports", "orther"];
    const schemaPost = yup.object({
      title: yup.string().required().min(15).max(120),
      description: yup.string().max(255),
      body: yup.string(),
      image: yup.string(),
      tags: yup.string(),
      author: yup.string(),
    });
    const modules = {
      name: "imageUploader",
      module: ImageUploader,
      module: BlotFormatter,
      options: {
        upload: (file) => {
          return new Promise((resolve, reject) => {
            const formData = new FormData();
            formData.append("image", file);

            axios
              .post("/upload-image", formData)
              .then((res) => {
                console.log(res);
                resolve(res.data.url);
              })
              .catch((err) => {
                reject("Upload failed");
                console.error("Error:", err);
              });
          });
        },
      },
    };

    // methods
    const submitForm = (values) => {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("body", quill.value.getHTML());
      formData.append("image", fileUpload.value);
      formData.append("tags", values.tags);
      context.emit("submit-form", formData);
    };

    const handldeChangeFile = (event) => {
      fileUpload.value = event.target.files[0];
    };

    // hooks
    onMounted(() => {
      setTimeout(() => {
        quill.value.setHTML(props.postSelected.body);
      }, 500);
    });
    return {
      schemaPost,
      tags,
      modules,
      quill,
      props,
      content,
      submitForm,
      handldeChangeFile,
    };
  },
};
</script>
<template>
  <Form as="div" v-slot="{ handleSubmit }" :validation-schema="schemaPost">
    <form class="form__post" @submit="handleSubmit($event, submitForm)">
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
        <!-- Editor -->
        <QuillEditor
          ref="quill"
          theme="snow"
          toolbar="full"
          :modules="modules"
          v-model:content="content"
        />
        <!-- Editor -->
      </div>
      <div class="form__select">
        <div class="form__group">
          <label for="file" class="form__label">Image</label>
          <Field name="file">
            <input type="file" @change="handldeChangeFile" multiple />
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
            <option disabled value="">Select post tag</option>
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
