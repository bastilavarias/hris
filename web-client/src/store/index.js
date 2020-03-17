import Vue from "vue";
import Vuex from "vuex";
import auth from "./modules/auth";
import subject from "./modules/subject";
import college from "./modules/college";
import course from "./modules/course";
import designation from "./modules/designation";
import notification from "./modules/notification";
import action from "./modules/action";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        auth,
        subject,
        college,
        course,
        designation,
        notification,
        action
    }
});
