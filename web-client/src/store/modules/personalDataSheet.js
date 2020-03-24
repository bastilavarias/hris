import {personalDataSheetService} from "../../services/api";
import {setActionName} from "../types/action";
import {getPersonalDataSheet, setCurrentPersonalDataSheet} from "../types/personalDataSheet";

export default {
    state: {
        error: {},
        current: {}
    },

    mutations: {
        [setCurrentPersonalDataSheet]: (state, pds) => state.current = pds
    },

    actions: {

        [getPersonalDataSheet]: async ({commit, rootState}) => {
            try {
                const employeeId = rootState.account.user.id;
                const result = await personalDataSheetService.getSingle(employeeId);
                const pds = result.data;
                commit(setCurrentPersonalDataSheet, pds);
                commit(setActionName, getPersonalDataSheet);
            } catch (errors) {
                commit(setActionName, "");
                throw new Error(`[RWV] ApiService ${errors}`);
            }
        },

        // [updatePersonalDataSheet]: async ({commit}, {courseId, details}) => {
        //     try {
        //         const result = await courseService.update(courseId, details);
        //         const {message, errors} = result.data;
        //         if (errors.length > 0) {
        //             commit(setActionName, `${updateCourse}-errors`);
        //             commit(setCourseErrors, errors);
        //             return;
        //         }
        //         commit(setNotificationConfig, {message, type: "success"});
        //         commit(setActionName, updateCourse);
        //     } catch (errors) {
        //         commit(setActionName, updateCourse);
        //         throw new Error(`[RWV] ApiService ${errors}`);
        //     }
        // },

    }
};