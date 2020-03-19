const facultyActions = [
    {
        name: "Personal Data Sheet",
        icon: "clipboard-account",
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
        name: "Final Teaching Assignment",
        icon: "account-details",
        route: {name: "personal-final-teaching-assignment"},
        subActions: []
    }
];

const personnelActions = [
    {
        name: "Personal Data Sheet",
        icon: "clipboard-account",
        route: {name: "personal-data-sheet"},
        subActions: []
    },
    {
        name: "Schedule",
        icon: "calendar-month",
        route: {name: "personal-schedule"},
        subActions: []
    }
];

const personnelDepartmentHeadActions = [
    {
        name: "Personal Data Sheet",
        icon: "clipboard-account",
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
                name: "Schedule Management",
                icon: "clock",
                route: {name: "personnel-schedule-management"},
                subActions: []
            },
            {
                name: "Leave Management",
                icon: "message-arrow-right",
                route: {name: "department-level-leave-management"},
                subActions: []
            },
        ]
    }
];

const deanActions = [
    {
        name: "Personal Data Sheet",
        icon: "clipboard-account",
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
        name: "Faculty Maintenance",
        icon: "account-cog",
        route: {},
        subActions: [
            {
                name: "Schedule Management",
                icon: "clock",
                route: {name: "faculty-schedule-management"},
                subActions: []
            },
            {
                name: "Leave Management",
                icon: "message-arrow-right",
                route: {name: "department-level-leave-management"},
                subActions: []
            }
        ]
    }
];

const vpaaActions = [
    {
        name: "Personal Data Sheet",
        icon: "clipboard-account",
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
        name: "Academic Maintenance",
        icon: "file-cog",
        route: {},
        subActions: [
            {
                name: "Subject Management",
                icon: "text-subject",
                route: {name: "subject-management"},
                subActions: []
            },
            {
                name: "College Management",
                icon: "school",
                route: {name: "college-management"},
                subActions: []
            },
            {
                name: "Course Management",
                icon: "book",
                route: {name: "course-management"},
                subActions: []
            }
        ]
    }
];

const hrActions = [
    {
        name: "Personal Data Sheet",
        icon: "clipboard-account",
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
                name: "Schedule Management",
                icon: "clock",
                route: {name: "personnel-schedule-management"},
                subActions: []
            },
            {
                name: "Leave Management",
                icon: "message-arrow-right",
                route: {name: "department-level-leave-management"},
                subActions: []
            },
            {
                name: "Time Card Management",
                icon: "calendar-clock",
                route: {name: "time-card-management"},
                subActions: []
            },
            {
                name: "Employee Management",
                icon: "account",
                route: {name: "employee-list"},
                subActions: []
            },
            {
                name: "Department Management",
                icon: "window-closed-variant",
                route: {name: "department-list"},
                subActions: []
            },
            {
                name: "Designation Management",
                icon: "window-closed-variant",
                route: {name: "designation-management"},
                subActions: []
            }
        ]
    }
];


export default {
    state: {
        isAuthenticated: false,
        userActions: []
    },

    mutations: {
        setAuthenticated: (state, isAuth) => state.isAuthenticated = isAuth,
        setUserActions: (state, actions) => state.userActions = actions
    },

    actions: {
        login: ({commit}, {employeeNumber, password}) => {
            const setUserActions = "setUserActions";
            const setAuthenticated = "setAuthenticated";
            if (employeeNumber && password === "faculty") {
                commit(setAuthenticated, true);
                commit(setUserActions, facultyActions);
                return;
            }

            if (employeeNumber && password === "personnel") {
                commit(setAuthenticated, true);
                commit(setUserActions, personnelActions);
                return;
            }

            if (employeeNumber && password === "pdhead") {
                commit(setAuthenticated, true);
                commit(setUserActions, personnelDepartmentHeadActions);
                return;
            }

            if (employeeNumber && password === "dean") {
                commit(setAuthenticated, true);
                commit(setUserActions, deanActions);
                return;
            }

            if (employeeNumber && password === "vpaa") {
                commit(setAuthenticated, true);
                commit(setUserActions, vpaaActions);
                return;
            }

            if (employeeNumber && password === "hr") {
                commit(setAuthenticated, true);
                commit(setUserActions, hrActions);
                return;
            }
        },

        purgeAuth: ({commit}) => {
            const setUserActions = "setUserActions";
            const setAuthenticated = "setAuthenticated";
            commit(setAuthenticated, false);
            commit(setUserActions, []);
        }
    }
};