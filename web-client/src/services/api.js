import Vue from "vue";
import axios from "axios";
import vueAxios from "vue-axios";

const apiService = {
    init: () => {
        Vue.use(vueAxios, axios);
        Vue.axios.defaults.baseURL = "/api/development";
    },

    setHeader() {
        // Vue.axios.defaults.headers.common["Authorization"] = tokenService.get();
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
    }
};

export default apiService;

export const subjectService = {
    getCategories: () => apiService.get("/subject/getAll/categories"),
    create: details => apiService.post("/subject/create", details),
    getAll: () => apiService.get("/subject/getAll"),
    getSingle: subjectId => apiService.get(`/subject/getSingle/${subjectId}`),
    search: ({option, value}) => apiService.get(`/subject/search/${option}/${value}`),
    update: (subjectId, details) => apiService.put(`/subject/update/${subjectId}`, details),
    delete: subjectId => apiService.delete(`/subject/delete/${subjectId}`)
};

export const collegeService = {
    create: details => apiService.post("/college/create", details),
    getAll: () => apiService.get("/college/getAll"),
    getSingle: collegeId => apiService.get(`/college/getSingle/${collegeId}`),
    search: ({option, value}) => apiService.get(`/college/search/${option}/${value}`),
    update: (collegeId, details) => apiService.put(`/college/update/${collegeId}`, details),
    delete: collegeId => apiService.delete(`/college/delete/${collegeId}`)
};