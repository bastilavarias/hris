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

        [getPersonalDataSheet]: async ({commit}, courseId) => {
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

        [updatePersonalDataSheet]: async ({commit}, {courseId, details}) => {
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

    }
};