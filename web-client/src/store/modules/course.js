import {courseService} from "../../services/api";
import {setActionName} from "../types/action";
import {setNotificationConfig} from "../types/notification";
import {
    createCourse,
    deleteCourse,
    getAllCourses,
    getSingleCourse,
    searchCourses,
    setCourseErrors,
    setCourses,
    setCurrentCourse,
    updateCourse
} from "../types/course";

export default {
    state: {
        errors: [],
        list: [],
        current: {}
    },

    mutations: {
        [setCourseErrors]: (state, errors) => state.errors = errors,
        [setCourses]: (state, courses) => state.list = courses,
        [setCurrentCourse]: (state, course) => state.current = course
    },

    actions: {
        [createCourse]: async ({commit}, {customId, name, description}) => {
            try {
                const result = await courseService.create({customId, name, description});
                const {errors, message} = result.data;
                if (errors.length > 0) {
                    commit(setActionName, `${createCourse}-errors`);
                    commit(setCourseErrors, errors);
                    return;
                }
                commit(setNotificationConfig, {message, type: "success"});
                commit(setActionName, createCourse);
            } catch (errors) {
                commit(setActionName, createCourse);
                throw new Error(`[RWV] ApiService ${errors}`);
            }
        },

        [getAllCourses]: async ({commit}) => {
            try {
                const result = await courseService.getAll();
                const courses = result.data;
                commit(setCourses, courses);
                commit(setActionName, getAllCourses);
            } catch (errors) {
                commit(setActionName, "");
                throw new Error(`[RWV] ApiService ${errors}`);
            }
        },

        [getSingleCourse]: async ({commit}, courseId) => {
            try {
                const result = await courseService.getSingle(courseId);
                const course = result.data;
                commit(setCurrentCourse, course);
                commit(setActionName, getSingleCourse);
            } catch (errors) {
                commit(setActionName, "");
                throw new Error(`[RWV] ApiService ${errors}`);
            }
        },

        [searchCourses]: async ({commit}, {option, value}) => {
            try {
                const result = await courseService.search({option, value});
                const courses = result.data;
                commit(setCourses, courses);
                commit(setActionName, searchCourses);
            } catch (errors) {
                commit(setActionName, "");
                throw new Error(`[RWV] ApiService ${errors}`);
            }
        },

        [updateCourse]: async ({commit}, {courseId, details}) => {
            try {
                const result = await courseService.update(courseId, details);
                const {message, errors} = result.data;
                if (errors.length > 0) {
                    commit(setActionName, `${updateCourse}-errors`);
                    commit(setCourseErrors, errors);
                    return;
                }
                commit(setNotificationConfig, {message, type: "success"});
                commit(setActionName, updateCourse);
            } catch (errors) {
                commit(setActionName, updateCourse);
                throw new Error(`[RWV] ApiService ${errors}`);
            }
        },

        [deleteCourse]: async ({commit}, courseId) => {
            try {
                const result = await courseService.delete(courseId);
                const {message, errors} = result.data;
                if (errors.length > 0) {
                    commit(setCourseErrors, errors);
                    commit(setActionName, `${deleteCourse}-errors`);
                    return;
                }
                commit(setActionName, deleteCourse);
                commit(setNotificationConfig, {message, type: "error"});
            } catch (errors) {
                commit(setActionName, deleteCourse);
                throw new Error(`[RWV] ApiService ${errors}`);
            }
        }
    }
};