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
                route: {name: "department-leave-management"},
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
                route: {name: "department-leave-management"},
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
        },

        purgeAuth: ({commit}) => {
            const setUserActions = "setUserActions";
            const setAuthenticated = "setAuthenticated";
            commit(setAuthenticated, false);
            commit(setUserActions, []);
        }
    }
};