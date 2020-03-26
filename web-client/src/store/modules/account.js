import {setActionName} from "../types/action";
import {createCourse} from "../types/course";
import {
    checkAccountToken,
    loginAccount,
    purgeAccountToken,
    setAccountAuthenticated,
    setAccountError,
    setAccountToken
} from "../types/account";
import tokenService from "../../services/token";
import apiService from "../../services/api";

const actions = [
    {
        name: "Personal Data Sheet",
        icon: "file-account",
        route: {name: "personal-data-sheet"},
        subActions: []
    },
    {
        name: "Schedule",
        icon: "calendar-month",
        route: {name: "personal-schedule"},
        subActions: []
    },
    {
        name: "Employee Maintenance",
        icon: "account-cog",
        route: {},
        subActions: [
            {
                name: "Employee Management",
                icon: "account",
                route: {name: "employee-list"},
                subActions: []
            },
            {
                name: "Department Management",
                icon: "account-details",
                route: {name: "department-list"},
                subActions: []
            },
            {
                name: "Designation Management",
                icon: "account-box",
                route: {name: "designation-management"},
                subActions: []
            },
            // {
            //     name: "Schedule Management",
            //     icon: "clock",
            //     route: {name: "faculty-schedule-list"},
            //     subActions: []
            // },
            // {
            //     name: "Employee Tagging",
            //     icon: "tag",
            //     route: {name: "personnel-schedule-list"},
            //     subActions: []
            // },
            // {
            //     name: "Leave Management",
            //     icon: "message-arrow-right",
            //     route: {name: "department-level-leave-management"},
            //     subActions: []
            // },
            // {
            //     name: "Time Card Management",
            //     icon: "calendar-clock",
            //     route: {name: "time-card-management"},
            //     subActions: []
            // }
        ]
    },
    {
        name: "Academic Maintenance",
        icon: "file-settings",
        route: {},
        subActions: [
            {
                name: "Subject Management",
                icon: "text-subject",
                route: {name: "subject-list"},
                subActions: []
            },
            {
                name: "College Management",
                icon: "teach",
                route: {name: "college-list"},
                subActions: []
            },
            {
                name: "Course Management",
                icon: "book",
                route: {name: "course-list"},
                subActions: []
            },
            {
                name: "Section Management",
                icon: "google-classroom",
                route: {name: "section-list"},
                subActions: []
            },
        ]
    },
];

const {accountService} = require("../../services/api");

export default {
    state: {
        isAuthenticated: false,
        user: {},
        error: {}
    },

    mutations: {
        [setAccountAuthenticated]: (state, isAuth) => state.isAuthenticated = isAuth,
        [setAccountError]: (state, error) => state.error = error,
        [setAccountToken]: (state, token) => {
            state.isAuthenticated = true;
            tokenService.insert(token);
            state.user = tokenService.getDecodedToken();
            state.user.actions = actions;
        },
        [purgeAccountToken]: (state) => {
            state.isAuthenticated = false;
            tokenService.remove();
        }

    },

    actions: {
        [loginAccount]: async ({commit}, {username, password}) => {
            try {
                const result = await accountService.login({username, password});
                const {error, token} = result.data;
                if (Object.keys(error).length > 0) {
                    commit(setActionName, `${loginAccount}-error`);
                    commit(setAccountError, error);
                    return;
                }
                commit(setAccountToken, token);
                apiService.setHeader();
                commit(setActionName, loginAccount);
            } catch (errors) {
                commit(setActionName, createCourse);
                throw new Error(`[RWV] ApiService ${errors}`);
            }
        },

        [checkAccountToken]: ({commit}) => {
            const token = tokenService.get() ? tokenService.get() : null;
            if (token) {
                apiService.setHeader();
                commit(setAccountToken, token);
            } else {
                commit(purgeAccountToken);
            }
        }
    }
};