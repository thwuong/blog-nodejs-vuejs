import { createApp } from "vue";
import { createPinia } from "pinia";

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
  faMagnifyingGlass,
  faXmark
);

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.component("font-awesome-icon", FontAwesomeIcon).mount("#app");
