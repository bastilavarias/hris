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
    setDesignationError,
    setDesignations,
    updateDesignation
} from "../types/designation";

export default {
    state: {
        error: [],
        list: [],
        current: {}
    },

    mutations: {
        [setDesignationError]: (state, error) => state.error = error,
        [setDesignations]: (state, designations) => state.list = designations,
        [setCurrentDesignation]: (state, designation) => state.current = designation
    },

    actions: {
        [createDesignation]: async ({commit}, {code, name, description, collegeId}) => {
            try {
                const result = await designationService.create({code, name, description, collegeId});
                const {error, message} = result.data;
                if (Object.keys(error).length > 0) {
                    commit(setActionName, `${createDesignation}-error`);
                    commit(setDesignationError, error);
                    return;
                }
                commit(setNotificationConfig, {message, type: "success"});
                commit(setActionName, createDesignation);
            } catch (error) {
                commit(setActionName, createDesignation);
                throw new Error(`[RWV] ApiService ${error}`);
            }
        },

        [getAllDesignations]: async ({commit}) => {
            try {
                const result = await designationService.getAll();
                const designations = result.data;
                commit(setDesignations, designations);
                commit(setActionName, getAllDesignations);
            } catch (error) {
                commit(setActionName, "");
                throw new Error(`[RWV] ApiService ${error}`);
            }
        },

        [getSingleDesignation]: async ({commit}, designationId) => {
            try {
                const result = await designationService.getSingle(designationId);
                const designation = result.data;
                commit(setCurrentDesignation, designation);
                commit(setActionName, getSingleDesignation);
            } catch (error) {
                commit(setActionName, "");
                throw new Error(`[RWV] ApiService ${error}`);
            }
        },

        [searchDesignations]: async ({commit}, {option, value}) => {
            try {
                const result = await designationService.search({option, value});
                const designations = result.data;
                commit(setDesignations, designations);
                commit(setActionName, searchDesignations);
            } catch (error) {
                commit(setActionName, "");
                throw new Error(`[RWV] ApiService ${error}`);
            }
        },

        [updateDesignation]: async ({commit}, {designationId, details}) => {
            try {
                const result = await designationService.update(designationId, details);
                const {message, error} = result.data;
                if (Object.keys(error).length > 0) {
                    commit(setActionName, `${updateDesignation}-error`);
                    commit(setDesignationError, error);
                    return;
                }
                commit(setNotificationConfig, {message, type: "success"});
                commit(setActionName, updateDesignation);
            } catch (error) {
                commit(setActionName, updateDesignation);
                throw new Error(`[RWV] ApiService ${error}`);
            }
        },

        [deleteDesignation]: async ({commit}, designationId) => {
            try {
                const result = await designationService.delete(designationId);
                const {message, error} = result.data;
                if (error.length > 0) {
                    commit(setDesignationError, error);
                    commit(setActionName, `${deleteDesignation}-error`);
                    return;
                }
                commit(setActionName, deleteDesignation);
                commit(setNotificationConfig, {message, type: "error"});
            } catch (error) {
                commit(setActionName, deleteDesignation);
                throw new Error(`[RWV] ApiService ${error}`);
            }
        }
    }
};