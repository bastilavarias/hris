import {
    createSubject,
    getAllSubjects,
    getSubjectCategories,
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
    },

    mutations: {
        [setSubjectCategories]: (state, categories) => state.categories = categories,
        [setSubjectFormErrors]: (state, errors) => state.errors = errors,
        [setSubjectActionStart]: (state, isActionStart) => state.isActionStart = isActionStart,
        [setSubjects]: (state, subjects) => state.list = subjects
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
        }
    }
};