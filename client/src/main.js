import { createApp, markRaw } from "vue";
import { createPinia } from "pinia";
// import CKEditor from "@ckeditor/ckeditor5-vue";

import App from "./App.vue";
import router from "./router";
import "../src/style.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
import {
  faArrowRight,
  faPen,
  faCaretUp,
  faTrash,
  faUser,
  faLock,
  faHeart,
  faArrowsLeftRightToLine,
  faMagnifyingGlass,
  faXmark,
  faThumbsUp,
  faEye,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faArrowRight,
  faCaretUp,
  faHeart,
  faPen,
  faTrash,
  faUser,
  faLock,
  faArrowsLeftRightToLine,
  faEye,
  faMagnifyingGlass,
  faXmark,
  faThumbsUp
);

const app = createApp(App);
const pinia = createPinia();
pinia.use(({ store }) => {
  store.router = markRaw(router);
});
app.use(pinia);
app.use(router);
app.component("font-awesome-icon", FontAwesomeIcon).mount("#app");
