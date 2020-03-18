import {employeeService} from "../../services/api";
import {setActionName} from "../types/action";
import {setNotificationConfig} from "../types/notification";
import {
    createEmployee,
    deleteEmployee,
    getAllEmployees,
    getSingleEmployee,
    searchEmployees,
    setCurrentEmployee,
    setEmployeeErrors,
    setEmployees,
    updateEmployee
} from "../types/employee";

export default {
    state: {
        errors: [],
        list: [],
        current: {}
    },

    mutations: {
        [setEmployeeErrors]: (state, errors) => state.errors = errors,
        [setEmployees]: (state, employees) => state.list = employees,
        [setCurrentEmployee]: (state, employee) => state.current = employee
    },

    actions: {
        [createEmployee]: async ({commit}, {}) => {
            try {
                const employeeForm = new FormData();
                employeeForm.append("profile", profileJson);
                const result = await employeeService.create(employeeForm);
                // const {errors, message} = result.data;
                // if (errors.length > 0) {
                //     commit(setActionName, `${createEmployee}-errors`);
                //     commit(setEmployeeErrors, errors);
                //     return;
                // }
                // commit(setNotificationConfig, {message, type: "success"});
                // commit(setActionName, createEmployee);
            } catch (errors) {
                commit(setActionName, createEmployee);
                throw new Error(`[RWV] ApiService ${errors}`);
            }
        },

        [getAllEmployees]: async ({commit}) => {
            try {
                const result = await employeeService.getAll();
                const employees = result.data;
                commit(setEmployees, employees);
                commit(setActionName, getAllEmployees);
            } catch (errors) {
                commit(setActionName, "");
                throw new Error(`[RWV] ApiService ${errors}`);
            }
        },

        [getSingleEmployee]: async ({commit}, employeeId) => {
            try {
                const result = await employeeService.getSingle(employeeId);
                const employee = result.data;
                commit(setCurrentEmployee, employee);
                commit(setActionName, getSingleEmployee);
            } catch (errors) {
                commit(setActionName, "");
                throw new Error(`[RWV] ApiService ${errors}`);
            }
        },

        [searchEmployees]: async ({commit}, {option, value}) => {
            try {
                const result = await employeeService.search({option, value});
                const employees = result.data;
                commit(setEmployees, employees);
                commit(setActionName, searchEmployees);
            } catch (errors) {
                commit(setActionName, "");
                throw new Error(`[RWV] ApiService ${errors}`);
            }
        },

        [updateEmployee]: async ({commit}, {employeeId, details}) => {
            try {
                const result = await employeeService.update(employeeId, details);
                const {message, errors} = result.data;
                if (errors.length > 0) {
                    commit(setActionName, `${updateEmployee}-errors`);
                    commit(setEmployeeErrors, errors);
                    return;
                }
                commit(setNotificationConfig, {message, type: "success"});
                commit(setActionName, updateEmployee);
            } catch (errors) {
                commit(setActionName, updateEmployee);
                throw new Error(`[RWV] ApiService ${errors}`);
            }
        },

        [deleteEmployee]: async ({commit}, employeeId) => {
            try {
                const result = await employeeService.delete(employeeId);
                const {message, errors} = result.data;
                if (errors.length > 0) {
                    commit(setEmployeeErrors, errors);
                    commit(setActionName, `${deleteEmployee}-errors`);
                    return;
                }
                commit(setActionName, deleteEmployee);
                commit(setNotificationConfig, {message, type: "error"});
            } catch (errors) {
                commit(setActionName, deleteEmployee);
                throw new Error(`[RWV] ApiService ${errors}`);
            }
        }
    }
};