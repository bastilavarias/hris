import {departmentService} from "../../services/api";
import {setActionName} from "../types/action";
import {setNotificationConfig} from "../types/notification";
import {
    createDepartment,
    deleteDepartment,
    getAllDepartments,
    getSingleDepartment,
    searchDepartments,
    setCurrentDepartment,
    setDepartmentError,
    setDepartments,
    updateDepartment
} from "../types/department";

export default {
    state: {
        error: {},
        list: [],
        current: {}
    },

    mutations: {
        [setDepartmentError]: (state, error) => state.error = error,
        [setDepartments]: (state, departments) => state.list = departments,
        [setCurrentDepartment]: (state, department) => state.current = department
    },

    actions: {
        [createDepartment]: async ({commit}, {name, description, employeeId}) => {
            try {
                const result = await departmentService.create({name, description, employeeId});
                const {error, message} = result.data;
                if (Object.keys(error).length > 0) {
                    commit(setActionName, `${createDepartment}-error`);
                    commit(setDepartmentError, error);
                    return;
                }
                commit(setNotificationConfig, {message, type: "success"});
                commit(setActionName, createDepartment);
            } catch (errors) {
                commit(setActionName, createDepartment);
                throw new Error(`[RWV] ApiService ${errors}`);
            }
        },

        [getAllDepartments]: async ({commit}) => {
            try {
                const result = await departmentService.getAll();
                const departments = result.data;
                commit(setDepartments, departments);
                commit(setActionName, getAllDepartments);
            } catch (errors) {
                commit(setActionName, "");
                throw new Error(`[RWV] ApiService ${errors}`);
            }
        },

        [getSingleDepartment]: async ({commit}, departmentId) => {
            try {
                const result = await departmentService.getSingle(departmentId);
                const department = result.data;
                commit(setCurrentDepartment, department);
                commit(setActionName, getSingleDepartment);
            } catch (errors) {
                commit(setActionName, "");
                throw new Error(`[RWV] ApiService ${errors}`);
            }
        },

        [searchDepartments]: async ({commit}, {option, value}) => {
            try {
                const result = await departmentService.search({option, value});
                const departments = result.data;
                commit(setDepartments, departments);
                commit(setActionName, searchDepartments);
            } catch (errors) {
                commit(setActionName, "");
                throw new Error(`[RWV] ApiService ${errors}`);
            }
        },

        [updateDepartment]: async ({commit}, {departmentId, details}) => {
            try {
                const result = await departmentService.update(departmentId, details);
                const {message, error} = result.data;
                if (Object.keys(error).length > 0) {
                    commit(setActionName, `${updateDepartment}-error`);
                    commit(setDepartmentError, error);
                    return;
                }
                commit(setNotificationConfig, {message, type: "success"});
                commit(setActionName, updateDepartment);
            } catch (errors) {
                commit(setActionName, updateDepartment);
                throw new Error(`[RWV] ApiService ${errors}`);
            }
        },

        [deleteDepartment]: async ({commit}, departmentId) => {
            try {
                const result = await departmentService.delete(departmentId);
                const {message, errors} = result.data;
                if (errors.length > 0) {
                    commit(setDepartmentError, errors);
                    commit(setActionName, `${deleteDepartment}-errors`);
                    return;
                }
                commit(setActionName, deleteDepartment);
                commit(setNotificationConfig, {message, type: "error"});
            } catch (errors) {
                commit(setActionName, deleteDepartment);
                throw new Error(`[RWV] ApiService ${errors}`);
            }
        }
    }
};