import {personalDataSheetService} from "../../services/api";
import {setActionName} from "../types/action";
import {
    getPersonalDataSheet,
    setCurrentPersonalDataSheet,
    setPersonalDataSheetError,
    updatePersonalDataSheet
} from "../types/personalDataSheet";
import {updateEmployee} from "../types/employee";
import {setNotificationConfig} from "../types/notification";

export default {
    state: {
        error: {},
        current: {}
    },

    mutations: {
        [setCurrentPersonalDataSheet]: (state, pds) => state.current = pds
    },

    actions: {

        [getPersonalDataSheet]: async ({commit}) => {
            try {
                const result = await personalDataSheetService.getSingle();
                const pds = result.data;
                commit(setCurrentPersonalDataSheet, pds);
                commit(setActionName, getPersonalDataSheet);
            } catch (errors) {
                commit(setActionName, "");
                throw new Error(`[RWV] ApiService ${errors}`);
            }
        },

        [updatePersonalDataSheet]: async ({commit}, profile) => {
            try {
                const pdsForm = new FormData();
                pdsForm.append("profile", JSON.stringify(profile));
                pdsForm.append("profilePhoto", profile.photo);
                const result = await personalDataSheetService.update(pdsForm);
                const {message, error} = result.data;
                if (Object.keys(error).length > 0) {
                    commit(setActionName, `${setPersonalDataSheetError}-error`);
                    commit(setPersonalDataSheetError, error);
                    return;
                }
                commit(setNotificationConfig, {message, type: "success"});
                commit(setActionName, updatePersonalDataSheet);
            } catch (errors) {
                commit(setActionName, updateEmployee);
                throw new Error(`[RWV] ApiService ${error}`);
            }
        }

    }
};