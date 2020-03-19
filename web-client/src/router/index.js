import Vue from "vue";
import VueRouter from "vue-router";

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
        children: [
            {
                path: "personal-schedule",
                name: "personal-schedule",
                component: () => import("../pages/schedule/Personal"),
            },

            {
                path: "personnel-schedule-management",
                component: () => import("../layouts/Sub"),
                children: [
                    {
                        path: "",
                        name: "personnel-schedule-management",
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
                        name: "faculty-schedule-management",
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
                path: "subject-management",
                component: () => import("../layouts/Sub"),
                children: [
                    {
                        path: "",
                        name: "subject-management",
                        component: () => import("../pages/subject/List")
                    },
                    {
                        path: ":operation/:subjectId?",
                        name: "subject-management-form",
                        component: () => import("../pages/subject/Form")
                    }
                ]
            },

            {
                path: "college-management",
                component: () => import("../layouts/Sub"),
                children: [
                    {
                        path: "",
                        name: "college-management",
                        component: () => import("../pages/college/List")
                    },
                    {
                        path: ":operation/:collegeId?",
                        name: "college-management-form",
                        component: () => import("../pages/college/Form")
                    }
                ]
            },

            {
                path: "course-management",
                component: () => import("../layouts/Sub"),
                children: [
                    {
                        path: "",
                        name: "course-management",
                        component: () => import("../pages/course/List")
                    },
                    {
                        path: ":operation/:courseId?",
                        name: "course-management-form",
                        component: () => import("../pages/course/Form")
                    }
                ]
            },

            {
                path: "department-management",
                component: () => import("../layouts/Sub"),
                children: [
                    {
                        path: "",
                        name: "department-management",
                        component: () => import("../pages/department/List")
                    },
                    {
                        path: ":operation",
                        name: "department-management-form",
                        component: () => import("../pages/department/Form")
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

            {
                path: "designation-management",
                component: () => import("../layouts/Sub"),
                children: [
                    {
                        path: "",
                        name: "designation-management",
                        component: () => import("../pages/designation/List")
                    },
                    {
                        path: ":operation/:designationId?",
                        name: "designation-management-form",
                        component: () => import("../pages/designation/Form")
                    }
                ]
            },

            {
                path: "department-management",
                component: () => import("../layouts/Sub"),
                children: [
                    {
                        path: "",
                        name: "department-list",
                        component: () => import("../pages/department/List")
                    },
                    {
                        path: ":operation/:departmentId?",
                        name: "department-form",
                        component: () => import("../pages/department/Form")
                    }
                ]
            },

            {
                path: "employee-management",
                component: () => import("../layouts/Sub"),
                children: [
                    {
                        path: "",
                        name: "employee-list",
                        component: () => import("../pages/employee/List")
                    },
                    {
                        path: "create",
                        name: "employee-create-form",
                        component: () => import("../pages/employee/CreateForm")
                    },
                    {
                        path: "update/:employeeId",
                        name: "employee-update-form",
                        component: () => import("../pages/employee/UpdateForm")
                    }
                ]
            }
        ]
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;
