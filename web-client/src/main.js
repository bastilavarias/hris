import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;

// Temporary hide VCalendar .native error.
const ignoredMessage =
  "The .native modifier for v-on is only valid on components but it was used on <div>.";

Vue.config.warnHandler = (message, vm, componentTrace) => {
  if (message !== ignoredMessage) {
    console.error(message + componentTrace);
  }
};

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
