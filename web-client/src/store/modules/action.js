import {setActionName} from "../types/action";

export default {
    state: {
        name: ""
    },

    mutations: {
        [setActionName]: (state, name) => state.name = name
    }
};