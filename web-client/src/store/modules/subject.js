import {
    createSubject,
    getAllSubjects, getSingleSubject,
    getSubjectCategories, searchSubjects, setCurrentSubject,
    setSubjectActionStart,
    setSubjectCategories,
    setSubjectFormErrors,
    setSubjects
} from "../types/subject";
import {subjectService} from "../../services/api";
import {setNotificationConfig} from "../types/notification";
import {setActionName} from "../types/action";

export default {
    state: {
        categories: [],
        errors: [],
        isActionStart: false,
        list: [],
        current: {}
    },

    mutations: {
        [setSubjectCategories]: (state, categories) => state.categories = categories,
        [setSubjectFormErrors]: (state, errors) => state.errors = errors,
        [setSubjectActionStart]: (state, isActionStart) => state.isActionStart = isActionStart,
        [setSubjects]: (state, subjects) => state.list = subjects,
        [setCurrentSubject]: (state, subject) => state.current = subject
    },

    actions: {
        [getSubjectCategories]: async ({commit}) => {
            try {
                const result = await subjectService.getCategories();
                const categories = result.data;
                commit(setSubjectCategories, categories);
            } catch (errors) {
                throw new Error(`[RWV] ApiService ${errors}`);
            }
        },

        [createSubject]: async ({commit}, {code, title, description, units, categoryId, prerequisiteSubjectId}) => {
            commit(setSubjectActionStart, true); // change it to  commit(setActionName, createSubject); later
            try {
                const result = await subjectService.create({
                    code,
                    title,
                    description,
                    units,
                    categoryId,
                    prerequisiteSubjectId
                });
                const {errors, message} = result.data;
                commit(setSubjectActionStart, false); // change it to  commit(setActionName, createSubject); later
                if (errors.length > 0) {
                    commit(setSubjectFormErrors, errors);
                    return;
                }
                commit(setNotificationConfig, {message, type: "success"});
                commit(setActionName, createSubject);
            } catch (errors) {
                commit(setSubjectActionStart, false); // change it to  commit(setActionName, createSubject); later
                throw new Error(`[RWV] ApiService ${errors}`);
            }
        },

        [getAllSubjects]: async ({commit}) => {
            commit(setActionName, getAllSubjects);
            try {
                const result = await subjectService.getAll();
                const subjects = result.data;
                commit(setSubjects, subjects);
                commit(setActionName, "");
            } catch (errors) {
                commit(setActionName, "");
                throw new Error(`[RWV] ApiService ${errors}`);
            }
        },

        [getSingleSubject]: async ({commit}, subjectId) => {
            commit(setActionName, getSingleSubject);
            try {
                const result = await subjectService.getSingle(subjectId);
                const subject = result.data;
                commit(setCurrentSubject, subject);
                commit(setActionName, "");
            } catch (errors) {
                commit(setActionName, "");
                throw new Error(`[RWV] ApiService ${errors}`);
            }
        },

        [searchSubjects]: async ({commit}, {option, value}) => {
            commit(setActionName, searchSubjects);
            try {
                const result = await subjectService.search({option, value});
                const subjects = result.data;
                commit(setSubjects, subjects);
                commit(setActionName, "");
            } catch (errors) {
                commit(setActionName, "");
                throw new Error(`[RWV] ApiService ${errors}`);
            }
        }
    }
};