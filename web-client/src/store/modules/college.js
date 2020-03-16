import {collegeService} from "../../services/api";
import {setActionName} from "../types/action";
import {setNotificationConfig} from "../types/notification";
import {
    createCollege,
    deleteCollege,
    getAllColleges,
    getSingleCollege,
    searchColleges,
    setCollegeErrors,
    setColleges,
    setCurrentCollege,
    updateCollege
} from "../types/college";

export default {
    state: {
        errors: [],
        list: [],
        current: {}
    },

    mutations: {
        [setCollegeErrors]: (state, errors) => state.errors = errors,
        [setColleges]: (state, colleges) => state.list = colleges,
        [setCurrentCollege]: (state, college) => state.current = college
    },

    actions: {
        [createCollege]: async ({commit}, {customId, name, description}) => {
            try {
                const result = await collegeService.create({customId, name, description});
                const {errors, message} = result.data;
                if (errors.length > 0) {
                    commit(setActionName, `${createCollege}-errors`);
                    commit(setCollegeErrors, errors);
                    return;
                }
                commit(setNotificationConfig, {message, type: "success"});
                commit(setActionName, createCollege);
            } catch (errors) {
                commit(setActionName, createCollege);
                throw new Error(`[RWV] ApiService ${errors}`);
            }
        },

        [getAllColleges]: async ({commit}) => {
            try {
                const result = await collegeService.getAll();
                const colleges = result.data;
                commit(setColleges, colleges);
                commit(setActionName, getAllColleges);
            } catch (errors) {
                commit(setActionName, "");
                throw new Error(`[RWV] ApiService ${errors}`);
            }
        },

        [getSingleCollege]: async ({commit}, collegeId) => {
            try {
                const result = await collegeService.getSingle(collegeId);
                const college = result.data;
                commit(setCurrentCollege, college);
                commit(setActionName, getSingleCollege);
            } catch (errors) {
                commit(setActionName, "");
                throw new Error(`[RWV] ApiService ${errors}`);
            }
        },

        [searchColleges]: async ({commit}, {option, value}) => {
            try {
                const result = await collegeService.search({option, value});
                const colleges = result.data;
                commit(setColleges, colleges);
                commit(setActionName, searchColleges);
            } catch (errors) {
                commit(setActionName, "");
                throw new Error(`[RWV] ApiService ${errors}`);
            }
        },

        [updateCollege]: async ({commit}, {collegeId, details}) => {
            try {
                const result = await collegeService.update(collegeId, details);
                const {message, errors} = result.data;
                if (errors.length > 0) {
                    commit(setActionName, `${updateCollege}-errors`);
                    commit(setCollegeErrors, errors);
                    return;
                }
                commit(setNotificationConfig, {message, type: "success"});
                commit(setActionName, updateCollege);
            } catch (errors) {
                commit(setActionName, updateCollege);
                throw new Error(`[RWV] ApiService ${errors}`);
            }
        },

        [deleteCollege]: async ({commit}, collegeId) => {
            try {
                const result = await collegeService.delete(collegeId);
                const {message, errors} = result.data;
                if (errors.length > 0) {
                    commit(setCollegeErrors, errors);
                    commit(setActionName, `${deleteCollege}-errors`);
                    return;
                }
                commit(setActionName, deleteCollege);
                commit(setNotificationConfig, {message, type: "error"});
            } catch (errors) {
                commit(setActionName, deleteCollege);
                throw new Error(`[RWV] ApiService ${errors}`);
            }
        }
    }
};