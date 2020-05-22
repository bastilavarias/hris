import {
  ACCOUNT_LOGIN,
  CHECK_ACCOUNT_AUTHENTICATION,
  SET_ACCOUNT_AUTHENTICATION,
  SET_ACCOUNT_ERROR,
  SET_PURGE_ACCOUNT_AUTHENTICATION,
} from "../types/account";
import Account from "../../common/api-service/modules/account";
import tokenService from "../../common/tokenService";
import apiService from "../../common/api-service";

const defaultCurrentAccount = {
  employeeNumber: "",
  profile: {
    firstName: "",
    middleName: "",
    lastName: "",
    extension: "",
    imageUrl: "",
  },
  designation: {
    title: "",
  },
  actions: [],
};

export default {
  state: {
    isAuthenticated: false,
    current: Object.assign({}, defaultCurrentAccount),
    defaultCurrentAccount,
    error: {},
  },

  mutations: {
    [SET_ACCOUNT_AUTHENTICATION]: (state, token) => {
      state.isAuthenticated = true;
      tokenService.insert(token);
      state.current = tokenService.getDecodedToken();
      apiService.setHeader();
    },
    [SET_ACCOUNT_ERROR]: (state, error) => (state.error = error),
    [SET_PURGE_ACCOUNT_AUTHENTICATION]: (state, token) => {
      state.isAuthenticated = false;
      tokenService.remove();
      state.current = Object.assign({}, state.defaultCurrentAccount);
    },
  },

  actions: {
    [ACCOUNT_LOGIN]: async ({ commit }, { username, password }) => {
      try {
        const result = await Account.login(username, password);
        const { token } = result.data;
        commit(SET_ACCOUNT_AUTHENTICATION, token);
      } catch (serverError) {
        const error = serverError.response.data;
        commit(SET_ACCOUNT_ERROR, error);
      }
    },

    [CHECK_ACCOUNT_AUTHENTICATION]: async ({ commit }) => {
      try {
        const gotToken = tokenService.get() ? tokenService.get() : null;
        if (gotToken) {
          apiService.setHeader();
          const result = await Account.authentication();
          const { token } = result.data;
          commit(SET_ACCOUNT_AUTHENTICATION, token);
        } else {
          commit(SET_PURGE_ACCOUNT_AUTHENTICATION);
        }
      } catch (serverError) {
        const error = serverError.response.data;
        commit(SET_ACCOUNT_ERROR, error);
      }
    },
  },
};
