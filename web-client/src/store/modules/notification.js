import {setNotificationMessage} from "../types/notification";

export default {
    state: {
        message: "",
    },

    mutations: {
        [setNotificationMessage]: (state, message) => {
            state.message = message;
        }
    }
};