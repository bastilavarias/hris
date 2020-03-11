import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name:  "login",
        component: () => import("../pages/Login")
    },

    {
        path: "/home",
        component: () => import("../layouts/Home"),
        children: [
            {
                path: "personal-data-sheet",
                component: () => import("../layouts/Sub"),
                children: [
                    {
                        path: "",
                        name: "personal-data-sheet-manager",
                        component: () => import("../pages/personal-data-sheet/Manager"),
                    },

                    {
                        path: ":operation/:employeeId?",
                        name: "personal-data-sheet-form",
                        component: () => import("../pages/personal-data-sheet/Form"),
                    },
                ]
            },
            {
                path: "subject",
                component: () => import("../layouts/Sub"),
                children: [
                    {
                        path: "",
                        name: "subject-manager",
                        component: () => import("../pages/subject/Manager")
                    },
                    {
                        path: ":operation/:subjectId?",
                        name: "subject-form",
                        component: () => import("../pages/subject/Form")
                    },
                ]
            },

            {
                path: "section",
                component: () => import("../layouts/Sub"),
                children: [
                    {
                        path: "",
                        name: "section-manager",
                        component: () => import("../pages/section/Manager")
                    },
                    {
                        path: ":operation/:sectionId?",
                        name: "section-form",
                        component: () => import("../pages/section/Form")
                    },
                ]
            },

            {
                path: "college",
                component: () => import("../layouts/Sub"),
                children: [
                    {
                        path: "",
                        name: "college-manager",
                        component: () => import("../pages/college/Manager")
                    },
                    {
                        path: ":operation/:collegeId?",
                        name: "college-form",
                        component: () => import("../pages/college/Form")
                    },
                ]
            },

            {
                path: "course",
                component: () => import("../layouts/Sub"),
                children: [
                    {
                        path: "",
                        name: "course-manager",
                        component: () => import("../pages/course/Manager")
                    },
                    {
                        path: ":operation/:courseId?",
                        name: "course-form",
                        component: () => import("../pages/course/Form")
                    },
                ]
            },

            {
                path: "department",
                component: () => import("../layouts/Sub"),
                children: [
                    {
                        path: "",
                        name: "department-manager",
                        component: () => import("../pages/department/Manager")
                    },
                    {
                        path: ":operation/:departmentId?",
                        name: "department-form",
                        component: () => import("../pages/department/Form")
                    },
                ]
            },
        ]
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;
