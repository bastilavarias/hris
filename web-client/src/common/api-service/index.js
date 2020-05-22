import Vue from "vue";
import axios from "axios";
import vueAxios from "vue-axios";
import tokenService from "../tokenService";

const index = {
  init: () => {
    Vue.use(vueAxios, axios);
    Vue.axios.defaults.baseURL = "/api/v1";
  },

  setHeader() {
    Vue.axios.defaults.headers.common["Authorization"] = tokenService.get();
  },

  get: (route, body) => {
    return Vue.axios.get(route, body);
  },

  post: (route, body) => {
    return Vue.axios.post(route, body);
  },

  put: (route, body) => {
    return Vue.axios.put(route, body);
  },

  delete: (route, body) => {
    return Vue.axios.delete(route, body);
  },
};

export default index;
