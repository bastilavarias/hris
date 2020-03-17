import {designationService} from "../../services/api";
import {setActionName} from "../types/action";
import {setNotificationConfig} from "../types/notification";
import {
    createDesignation,
    deleteDesignation,
    getAllDesignations,
    getSingleDesignation,
    searchDesignations,
    setCurrentDesignation,
    setDesignationErrors,
    setDesignations,
    updateDesignation
} from "../types/designation";

export default {
    state: {
        errors: [],
        list: [],
        current: {}
    },

    mutations: {
        [setDesignationErrors]: (state, errors) => state.errors = errors,
        [setDesignations]: (state, designations) => state.list = designations,
        [setCurrentDesignation]: (state, designation) => state.current = designation
    },

    actions: {
        [createDesignation]: async ({commit}, {code, name, description, collegeId}) => {
            try {
                const result = await designationService.create({code, name, description, collegeId});
                const {errors, message} = result.data;
                if (errors.length > 0) {
                    commit(setActionName, `${createDesignation}-errors`);
                    commit(setDesignationErrors, errors);
                    return;
                }
                commit(setNotificationConfig, {message, type: "success"});
                commit(setActionName, createDesignation);
            } catch (errors) {
                commit(setActionName, createDesignation);
                throw new Error(`[RWV] ApiService ${errors}`);
            }
        },

        [getAllDesignations]: async ({commit}) => {
            try {
                const result = await designationService.getAll();
                const designations = result.data;
                commit(setDesignations, designations);
                commit(setActionName, getAllDesignations);
            } catch (errors) {
                commit(setActionName, "");
                throw new Error(`[RWV] ApiService ${errors}`);
            }
        },

        [getSingleDesignation]: async ({commit}, designationId) => {
            try {
                const result = await designationService.getSingle(designationId);
                const designation = result.data;
                commit(setCurrentDesignation, designation);
                commit(setActionName, getSingleDesignation);
            } catch (errors) {
                commit(setActionName, "");
                throw new Error(`[RWV] ApiService ${errors}`);
            }
        },

        [searchDesignations]: async ({commit}, {option, value}) => {
            try {
                const result = await designationService.search({option, value});
                const designations = result.data;
                commit(setDesignations, designations);
                commit(setActionName, searchDesignations);
            } catch (errors) {
                commit(setActionName, "");
                throw new Error(`[RWV] ApiService ${errors}`);
            }
        },

        [updateDesignation]: async ({commit}, {designationId, details}) => {
            try {
                const result = await designationService.update(designationId, details);
                const {message, errors} = result.data;
                if (errors.length > 0) {
                    commit(setActionName, `${updateDesignation}-errors`);
                    commit(setDesignationErrors, errors);
                    return;
                }
                commit(setNotificationConfig, {message, type: "success"});
                commit(setActionName, updateDesignation);
            } catch (errors) {
                commit(setActionName, updateDesignation);
                throw new Error(`[RWV] ApiService ${errors}`);
            }
        },

        [deleteDesignation]: async ({commit}, designationId) => {
            try {
                const result = await designationService.delete(designationId);
                const {message, errors} = result.data;
                if (errors.length > 0) {
                    commit(setDesignationErrors, errors);
                    commit(setActionName, `${deleteDesignation}-errors`);
                    return;
                }
                commit(setActionName, deleteDesignation);
                commit(setNotificationConfig, {message, type: "error"});
            } catch (errors) {
                commit(setActionName, deleteDesignation);
                throw new Error(`[RWV] ApiService ${errors}`);
            }
        }
    }
};