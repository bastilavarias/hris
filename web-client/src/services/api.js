import Vue from "vue";
import axios from "axios";
import vueAxios from "vue-axios";
import tokenService from "./token";

const apiService = {
  init: () => {
    Vue.use(vueAxios, axios);
    Vue.axios.defaults.baseURL = "/api/development";
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
  }
};

export default apiService;

export const subjectService = {
  getCategories: () => apiService.get("/subject/getAll/categories"),
  create: details => apiService.post("/subject/create", details),
  getAll: () => apiService.get("/subject/getAll"),
  getSingle: subjectId => apiService.get(`/subject/getSingle/${subjectId}`),
  search: ({ option, value }) =>
    apiService.get(`/subject/search/${option}/${value}`),
  update: (subjectId, details) =>
    apiService.put(`/subject/update/${subjectId}`, details),
  delete: subjectId => apiService.delete(`/subject/delete/${subjectId}`)
};

export const collegeService = {
  create: details => apiService.post("/college/create", details),
  getAll: () => apiService.get("/college/getAll"),
  getSingle: collegeId => apiService.get(`/college/getSingle/${collegeId}`),
  search: ({ option, value }) =>
    apiService.get(`/college/search/${option}/${value}`),
  update: (collegeId, details) =>
    apiService.put(`/college/update/${collegeId}`, details),
  delete: collegeId => apiService.delete(`/college/delete/${collegeId}`)
};

export const courseService = {
  create: details => apiService.post("/course/create", details),
  getAll: () => apiService.get("/course/getAll"),
  getSingle: courseId => apiService.get(`/course/getSingle/${courseId}`),
  search: ({ option, value }) =>
    apiService.get(`/course/search/${option}/${value}`),
  update: (courseId, details) =>
    apiService.put(`/course/update/${courseId}`, details),
  delete: courseId => apiService.delete(`/course/delete/${courseId}`)
};

export const sectionService = {
  create: details => apiService.post("/section/create", details),
  getAll: () => apiService.get("/section/getAll"),
  getSingle: sectionId => apiService.get(`/section/getSingle/${sectionId}`),
  search: ({ option, value }) =>
    apiService.get(`/section/search/${option}/${value}`),
  update: (sectionId, details) =>
    apiService.put(`/section/update/${sectionId}`, details),
  delete: sectionId => apiService.delete(`/section/delete/${sectionId}`)
};

export const designationService = {
  create: details => apiService.post("/designation/create", details),
  getAll: () => apiService.get("/designation/getAll"),
  getSingle: designationId =>
    apiService.get(`/designation/getSingle/${designationId}`),
  search: ({ option, value }) =>
    apiService.get(`/designation/search/${option}/${value}`),
  update: (designationId, details) =>
    apiService.put(`/designation/update/${designationId}`, details),
  delete: designationId =>
    apiService.delete(`/designation/delete/${designationId}`)
};

export const departmentService = {
  create: details => apiService.post("/department/create", details),
  getAll: () => apiService.get("/department/getAll"),
  getSingle: departmentId =>
    apiService.get(`/department/getSingle/${departmentId}`),
  search: ({ option, value }) =>
    apiService.get(`/department/search/${option}/${value}`),
  update: (departmentId, details) =>
    apiService.put(`/department/update/${departmentId}`, details),
  delete: departmentId =>
    apiService.delete(`/department/delete/${departmentId}`)
};

export const employeeService = {
  create: details => apiService.post("/employee/create", details),
  generateEmployeeNumber: () =>
    apiService.get("/employee/generate/employeeNumber"),
  getAll: () => apiService.get("/employee/getAll"),
  search: ({ option, value }) =>
    apiService.get(`/employee/search/${option}/${value}`),
  getSingle: employeeId => apiService.get(`/employee/getSingle/${employeeId}`),
  update: (employeeId, details) =>
    apiService.put(`/employee/update/${employeeId}`, details)
};

export const accountService = {
  login: details => apiService.post("/account/login", details)
};

export const personalDataSheetService = {
  getSingle: () => apiService.get(`/personal-data-sheet/getSingle`),
  update: details => apiService.put(`/personal-data-sheet/update`, details),
  generate: () =>
    Vue.axios.get("/personal-data-sheet/generate", {
      responseType: "arraybuffer"
    })
};

export const scheduleService = {
  createPersonnelSchedule: (employeeId, details) =>
    apiService.post(
      `/schedule/create/personnel-schedule/${employeeId}`,
      details
    ),
  searchPersonnelSchedule: (employeeId, details) =>
    apiService.post(
      `/schedule/search/personnel-schedule/${employeeId}`,
      details
    ),
  updatePersonnelSchedule: (employeeId, details) =>
    apiService.put(
      `/schedule/update/personnel-schedule/${employeeId}`,
      details
    ),
  deletePersonnelSchedule: (employeeId, details) =>
    apiService.put(
      `/schedule/delete/personnel-schedule/${employeeId}`,
      details
    ),
  getPersonalPersonnelSchedule: date =>
    apiService.get(`/schedule/get/personal-personnel-schedule/${date}`)
};

export const semesterService = {
  create: details => apiService.post("/semester/create", details),
  getAll: () => apiService.get("/semester/getAll"),
  getSingle: semesterId => apiService.get(`/semester/getSingle/${semesterId}`),
  search: ({ option, value }) =>
    apiService.get(`/semester/search/${option}/${value}`),
  update: (semesterId, details) =>
    apiService.put(`/semester/update/${semesterId}`, details),
  delete: semesterId => apiService.delete(`/semester/delete/${semesterId}`)
};

export const schoolYearService = {
  update: details => apiService.put(`/school-year/update`, details),
  getCurrent: () => apiService.get(`/school-year/getCurrent`)
};

export const yearLevelService = {
  create: details => apiService.post("/year-level/create", details),
  getAll: () => apiService.get("/year-level/getAll"),
  getSingle: yearLevelId =>
    apiService.get(`/year-level/getSingle/${yearLevelId}`),
  search: ({ option, value }) =>
    apiService.get(`/year-level/search/${option}/${value}`),
  update: (yearLevelId, details) =>
    apiService.put(`/year-level/update/${yearLevelId}`, details),
  delete: yearLevelId => apiService.delete(`/year-level/delete/${yearLevelId}`)
};

export const buildingService = {
  create: details => apiService.post("/building/create", details),
  getAll: () => apiService.get("/building/getAll"),
  getSingle: buildingId => apiService.get(`/building/getSingle/${buildingId}`),
  search: ({ option, value }) =>
    apiService.get(`/building/search/${option}/${value}`),
  update: (buildingId, details) =>
    apiService.put(`/building/update/${buildingId}`, details),
  delete: buildingId => apiService.delete(`/building/delete/${buildingId}`)
};

export const roomService = {
  create: details => apiService.post("/room/create", details),
  getAll: () => apiService.get("/room/getAll"),
  getSingle: roomId => apiService.get(`/room/getSingle/${roomId}`),
  search: ({ option, value }) =>
    apiService.get(`/room/search/${option}/${value}`),
  update: (roomId, details) =>
    apiService.put(`/room/update/${roomId}`, details),
  delete: roomId => apiService.delete(`/room/delete/${roomId}`)
};
