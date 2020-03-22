import {employeeService} from "../../services/api";
import {setActionName} from "../types/action";
import {setNotificationConfig} from "../types/notification";
import {
    createEmployee,
    deleteEmployee,
    generateEmployeeNumber,
    getAllEmployees,
    getSingleEmployee,
    searchEmployees,
    setCurrentEmployee,
    setEmployeeError,
    setEmployeeNumber,
    setEmployees,
    updateEmployee
} from "../types/employee";

export default {
    state: {
        error: {},
        list: [],
        current: {},
        employeeNumber: ""
    },

    mutations: {
        [setEmployeeError]: (state, error) => state.error = error,
        [setEmployees]: (state, employees) => state.list = employees,
        [setCurrentEmployee]: (state, employee) => state.current = employee,
        [setEmployeeNumber]: (state, employeeNumber) => state.employeeNumber = employeeNumber
    },

    actions: {
        [createEmployee]: async ({commit}, {employeeNumber, departmentId, designationId, isFullTime, profile}) => {
            try {
                const employeeForm = new FormData();
                employeeForm.append("employeeNumber", employeeNumber);
                employeeForm.append("departmentId", departmentId);
                employeeForm.append("departmentId", departmentId);
                employeeForm.append("designationId", designationId);
                employeeForm.append("isFullTime", isFullTime);
                employeeForm.append("profile", JSON.stringify(profile));
                employeeForm.append("profilePhoto", profile.photo);
                const result = await employeeService.create(employeeForm);
                const {error, message} = result.data;
                if (Object.keys(error).length > 0) {
                    commit(setActionName, `${createEmployee}-error`);
                    commit(setEmployeeError, error);
                    commit(setNotificationConfig, {message: "You had errors.", type: "error"});
                    return;
                }
                commit(setNotificationConfig, {message, type: "success"});
                commit(setActionName, createEmployee);
            } catch (errors) {
                commit(setActionName, createEmployee);
                throw new Error(`[RWV] ApiService ${error}`);
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
                throw new Error(`[RWV] ApiService ${error}`);
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
                throw new Error(`[RWV] ApiService ${error}`);
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
                throw new Error(`[RWV] ApiService ${error}`);
            }
        },

        [updateEmployee]: async ({commit}, {employeeId, employeeNumber, departmentId, designationId, isFullTime, profile}) => {
            try {
                const employeeForm = new FormData();
                employeeForm.append("employeeNumber", employeeNumber);
                employeeForm.append("departmentId", departmentId);
                employeeForm.append("departmentId", departmentId);
                employeeForm.append("designationId", designationId);
                employeeForm.append("isFullTime", isFullTime);
                employeeForm.append("profile", JSON.stringify(profile));
                const result = await employeeService.update(employeeId, {
                    employeeNumber,
                    departmentId,
                    designationId,
                    isFullTime,
                    profile
                });
                console.log(result.data);
                // const {message, error} = result.data;
                // if (error.length > 0) {
                //     commit(setActionName, `${updateEmployee}-error`);
                //     commit(setEmployeeError, error);
                //     return;
                // }
                // commit(setNotificationConfig, {message, type: "success"});
                commit(setActionName, updateEmployee);
            } catch (errors) {
                commit(setActionName, updateEmployee);
                throw new Error(`[RWV] ApiService ${error}`);
            }
        },

        [deleteEmployee]: async ({commit}, employeeId) => {
            try {
                const result = await employeeService.delete(employeeId);
                const {message, error} = result.data;
                if (error.length > 0) {
                    commit(setEmployeeError, error);
                    commit(setActionName, `${deleteEmployee}-error`);
                    return;
                }
                commit(setActionName, deleteEmployee);
                commit(setNotificationConfig, {message, type: "error"});
            } catch (errors) {
                commit(setActionName, deleteEmployee);
                throw new Error(`[RWV] ApiService ${error}`);
            }
        },

        [generateEmployeeNumber]: async ({commit}) => {
            try {
                const result = await employeeService.generateEmployeeNumber();
                const employeeNumber = result.data.employeeNumber;
                commit(setActionName, generateEmployeeNumber);
                commit(setEmployeeNumber, employeeNumber);
            } catch (errors) {
                commit(setActionName, generateEmployeeNumber);
                throw new Error(`[RWV] ApiService ${error}`);
            }
        }

    }
};