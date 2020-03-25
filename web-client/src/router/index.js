import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";
import {checkAccountToken} from "../store/types/account";
import personalMaintenance from "./modules/personalMaintenance";
import employeeMaintenance from "./modules/employeeMaintenance";
import academicMaintenance from "./modules/academicMaintenance";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "login",
        component: () => import("../pages/Login")
    },

    {
        path: "/home",
        component: () => import("../layouts/Home"),
        meta: {
            requiresAuth: true
        },
        children: [
            {
                path: "personnel-schedule-management",
                component: () => import("../layouts/Sub"),
                children: [
                    {
                        path: "",
                        name: "personnel-schedule-list",
                        component: () => import("../pages/schedule/personnel/List")
                    },
                    {
                        path: ":operation",
                        name: "personnel-schedule-tagger",
                        component: () => import("../pages/schedule/personnel/Tagger")
                    }
                ]
            },
            {
                path: "faculty-schedule-management",
                component: () => import("../layouts/Sub"),
                children: [
                    {
                        path: "",
                        name: "faculty-schedule-list",
                        component: () => import("../pages/schedule/faculty/List")
                    },
                    {
                        path: ":operation",
                        name: "faculty-schedule-form",
                        component: () => import("../pages/schedule/faculty/Form")
                    }
                ]
            },
            {
                path: "department-level-leave-management",
                component: () => import("../layouts/Sub"),
                children: [
                    {
                        path: "",
                        name: "department-level-leave-management",
                        component: () => import("../pages/leave/department-level/List")
                    }
                ]
            },
            {
                path: "time-card-management",
                component: () => import("../layouts/Sub"),
                children: [
                    {
                        path: "",
                        name: "time-card-management",
                        component: () => import("../pages/time-card/List")
                    },
                    {
                        path: "form",
                        component: () => import("../pages/time-card/form"),
                        children: [
                            {
                                path: "daily",
                                name: "time-card-management-form-daily",
                                component: () => import("../pages/time-card/form/Daily"),
                            },
                            {
                                path: "monthly",
                                name: "time-card-management-form-monthly",
                                component: () => import("../pages/time-card/form/Monthly"),
                            }
                        ]
                    }
                ]
            },
            ...personalMaintenance,
            ...employeeMaintenance,
            ...academicMaintenance
        ]
    }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

router.beforeEach(async (to, from, next) => {
    await store.dispatch(checkAccountToken);
    const isAuthenticated = store.state.account.isAuthenticated;
    if (isAuthenticated && to.name === "login") {
        next({
            name: "personal-data-sheet"
        });
    }
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!isAuthenticated) {
            next({
                name: "login"
            });
        } else {
            next();
        }
    } else {
        next();
    }
});


export default router;
