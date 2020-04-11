import { setNotificationConfig } from "../types/notification";

export default {
  state: {
    message: "",
    type: ""
  },

  mutations: {
    [setNotificationConfig]: (state, { message, type }) => {
      state.message = message;
      state.type = type;
    }
  }
};
