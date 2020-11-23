import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import { BootstrapVue } from "bootstrap-vue";
import VueCompositionApi from "@vue/composition-api";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import fire from "./firebase.js";

Vue.config.productionTip = false;

Vue.use(fire);
Vue.use(VueCompositionApi);
Vue.use(BootstrapVue);

new Vue({
  store,
  render: (h) => h(App)
}).$mount("#app");
