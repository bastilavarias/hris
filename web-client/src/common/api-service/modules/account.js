import apiService from "../index";

export default {
  login: (username, password) =>
    apiService.post("/account/login", { username, password }),
  authentication: () => apiService.get("/account"),
};
