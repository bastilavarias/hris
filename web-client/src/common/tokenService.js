import jwtDecoder from "jwt-decode";

const tokenKey = "token";

const tokenService = {
  insert(token) {
    window.localStorage.setItem(tokenKey, token);
  },

  get() {
    return window.localStorage.getItem(tokenKey)
      ? window.localStorage.getItem(tokenKey)
      : null;
  },

  remove() {
    window.localStorage.removeItem(tokenKey);
  },

  getDecodedToken() {
    const token = this.get();
    if (token !== null) return jwtDecoder(token);
    return {};
  },
};

export default tokenService;
