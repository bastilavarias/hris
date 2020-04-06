import {
    createPersonnelSchedule,
    deletePersonnelSchedule,
    searchPersonnelSchedule,
    setPersonnelSchedule,
    updatePersonnelSchedule
} from "../types/schedule";
import {scheduleService} from "../../services/api";
import {setNotificationConfig} from "../types/notification";
import {setActionName} from "../types/action";

export default {
    state: {
        personnelSchedule: []
    },

    mutations: {
        [setPersonnelSchedule]: (state, schedule) => state.personnelSchedule = schedule
    },

    actions: {
        [createPersonnelSchedule]: async ({commit}, {employeeId, monthNumber, startTime, endTime, year}) => {
            try {
                const result = await scheduleService.createPersonnelSchedule(employeeId, {
                    monthNumber,
                    startTime,
                    endTime,
                    year
                });
                const {message, error} = result.data;
                if (Object.keys(error).length > 0) {
                    // commit(setActionName, `${createSubject}-error`);
                    // commit(setSubjectError, error);
                    return;
                }
                commit(setNotificationConfig, {message, type: "success"});
                commit(setActionName, createPersonnelSchedule);
            } catch (errors) {
                commit(setActionName, createPersonnelSchedule);
                throw new Error(`[RWV] ApiService ${errors}`);
            }
        },

        [searchPersonnelSchedule]: async ({commit}, {employeeId, fromDate, toDate}) => {
            try {
                const result = await scheduleService.searchPersonnelSchedule(employeeId, {fromDate, toDate});
                const schedule = result.data;
                commit(setPersonnelSchedule, schedule);
                commit(setActionName, searchPersonnelSchedule);
            } catch (errors) {
                commit(setActionName, createPersonnelSchedule);
                throw new Error(`[RWV] ApiService ${errors}`);
            }
        },

        [updatePersonnelSchedule]: async ({commit}, {employeeId, scheduleIdList, startTime, endTime}) => {
            try {
                const result = await scheduleService.updatePersonnelSchedule(employeeId, {
                    scheduleIdList,
                    startTime,
                    endTime
                });
                const {message, error} = result.data;
                if (Object.keys(error).length > 0) {
                    // commit(setActionName, `${createSubject}-error`);
                    // commit(setSubjectError, error);
                    return;
                }
                commit(setNotificationConfig, {message, type: "success"});
                commit(setActionName, updatePersonnelSchedule);
            } catch (errors) {
                commit(setActionName, createPersonnelSchedule);
                throw new Error(`[RWV] ApiService ${errors}`);
            }
        },

        [deletePersonnelSchedule]: async ({commit}, {employeeId, scheduleIdList}) => {
            try {
                const result = await scheduleService.deletePersonnelSchedule(employeeId, {
                    scheduleIdList,
                });
                const {message, error} = result.data;
                if (Object.keys(error).length > 0) {
                    // commit(setActionName, `${createSubject}-error`);
                    // commit(setSubjectError, error);
                    return;
                }
                commit(setNotificationConfig, {message, type: "error"});
                commit(setActionName, deletePersonnelSchedule);
            } catch (errors) {
                commit(setActionName, createPersonnelSchedule);
                throw new Error(`[RWV] ApiService ${errors}`);
            }
        },
    }
};