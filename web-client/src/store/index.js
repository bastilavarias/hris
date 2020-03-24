import Vue from "vue";
import Vuex from "vuex";
import account from "./modules/account";
import subject from "./modules/subject";
import college from "./modules/college";
import course from "./modules/course";
import designation from "./modules/designation";
import employee from "./modules/employee";
import notification from "./modules/notification";
import action from "./modules/action";
import department from "./modules/department";
import personalDataSheet from "./modules/personalDataSheet";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        account,
        subject,
        college,
        course,
        designation,
        employee,
        notification,
        action,
        department,
        personalDataSheet
    }
});
