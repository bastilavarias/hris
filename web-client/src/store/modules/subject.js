import {
    createSubject,
    getSubjectCategories,
    setSubjectActionStart,
    setSubjectCategories,
    setSubjectFormErrors
} from "../types/subject";
import {subjectService} from "../../services/api";
import {setNotificationMessage} from "../types/notification";

export default {
    state: {
        categories: [],
        errors: [],
        isActionStart: false
    },

    mutations: {
        [setSubjectCategories]: (state, categories) => state.categories = categories,
        [setSubjectFormErrors]: (state, errors) => state.errors = errors,
        [setSubjectActionStart]: (state, isActionStart) => state.isActionStart = isActionStart
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
            commit(setSubjectActionStart, true);
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
                commit(setSubjectActionStart, false);
                if (errors.length > 0) {
                    commit(setSubjectFormErrors, errors);
                    return;
                }
                commit(setNotificationMessage, message);
            } catch (errors) {
                commit(setSubjectActionStart, false);
                throw new Error(`[RWV] ApiService ${errors}`);
            }
        }
    }
};