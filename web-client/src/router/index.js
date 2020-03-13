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
                path: "personal-data-sheet",
                component: () => import("../layouts/Sub"),
                children: [
                    {
                        path: "",
                        name: "personal-data-sheet",
                        component: () => import("../pages/personal-data-sheet/Personal"),
                    }
                ]
            },

            {
                path: "personal-schedule",
                name: "personal-schedule",
                component: () => import("../pages/schedule/Personal"),
            },

            {
                path: "personal-final-teaching-assignment",
                component: () => import("../layouts/Sub"),
                children: [
                    {
                        path: "",
                        name: "personal-final-teaching-assignment",
                        component: () => import("../pages/final-teaching-assignment/personal/List"),
                    },
                    {
                        path: ":operation/:finalTeachingAssignmentId?",
                        name: "personal-final-teaching-assignment-form",
                        component: () => import("../pages/final-teaching-assignment/personal/Form"),
                    },
                ]

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
                path: "department-leave-management",
                component: () => import("../layouts/Sub"),
                children: [
                    {
                        path: "",
                        name: "department-leave-management",
                        component: () => import("../pages/leave/department/List")
                    }
                ]
            }

            // {
            //     path: "subject",
            //     component: () => import("../layouts/Sub"),
            //     children: [
            //         {
            //             path: "",
            //             name: "subject-list",
            //             component: () => import("../pages/subject/List")
            //         },
            //         {
            //             path: ":operation/:subjectId?",
            //             name: "subject-form",
            //             component: () => import("../pages/subject/Form")
            //         },
            //     ]
            // },
            // {
            //     path: "section",
            //     component: () => import("../layouts/Sub"),
            //     children: [
            //         {
            //             path: "",
            //             name: "section-list",
            //             component: () => import("../pages/section/List")
            //         },
            //         {
            //             path: ":operation/:sectionId?",
            //             name: "section-form",
            //             component: () => import("../pages/section/Form")
            //         },
            //     ]
            // },
            // {
            //     path: "college",
            //     component: () => import("../layouts/Sub"),
            //     children: [
            //         {
            //             path: "",
            //             name: "college-list",
            //             component: () => import("../pages/college/List")
            //         },
            //         {
            //             path: ":operation/:collegeId?",
            //             name: "college-form",
            //             component: () => import("../pages/college/Form")
            //         },
            //     ]
            // },
            // {
            //     path: "course",
            //     component: () => import("../layouts/Sub"),
            //     children: [
            //         {
            //             path: "",
            //             name: "course-list",
            //             component: () => import("../pages/course/List")
            //         },
            //         {
            //             path: ":operation/:courseId?",
            //             name: "course-form",
            //             component: () => import("../pages/course/Form")
            //         },
            //     ]
            // },
            // {
            //     path: "department",
            //     component: () => import("../layouts/Sub"),
            //     children: [
            //         {
            //             path: "",
            //             name: "department-list",
            //             component: () => import("../pages/department/List")
            //         },
            //         {
            //             path: ":operation/:departmentId?",
            //             name: "department-form",
            //             component: () => import("../pages/department/Form")
            //         },
            //     ]
            // },
            // {
            //     path: "room",
            //     component: () => import("../layouts/Sub"),
            //     children: [
            //         {
            //             path: "",
            //             name: "room-list",
            //             component: () => import("../pages/room/List")
            //         },
            //         {
            //             path: ":operation/:roomId?",
            //             name: "room-form",
            //             component: () => import("../pages/room/Form")
            //         },
            //     ]
            // },
            // {
            //     path: "schedule",
            //     component: () => import("../layouts/Sub"),
            //     children: [
            //         {
            //             path: "faculty",
            //             component: () => import("../layouts/Sub"),
            //             children: [
            //                 {
            //                     path: "",
            //                     name: "schedule-faculty-list",
            //                     component: () => import("../pages/schedule/faculty/List")
            //                 },
            //                 {
            //                     path: ":operation/:scheduleId?",
            //                     name: "schedule-faculty-form",
            //                     component: () => import("../pages/schedule/faculty/Form")
            //                 },
            //             ]
            //         },
            //         {
            //             path: "personnel",
            //             component: () => import("../layouts/Sub"),
            //             children: [
            //                 {
            //                     path: "tagger",
            //                     name: "schedule-personnel-tagger",
            //                     component: () => import("../pages/schedule/personnel/Tagger")
            //                 }
            //             ]
            //         },
            //     ]
            // },
            // {
            //     path: "employee",
            //     component: () => import("../layouts/Sub"),
            //     children: [
            //         {
            //             path: "",
            //             name: "employee-list",
            //             component: () => import("../pages/employee/List")
            //         }
            //     ]
            // },
            // {
            //     path: "time-card",
            //     component: () => import("../layouts/Sub"),
            //     children: [
            //         {
            //             path: "monthly",
            //             name: "monthly-time-card",
            //             component: () => import("../pages/time-card/Monthly")
            //         },
            //         {
            //             path: "daily",
            //             name: "daily-time-card",
            //             component: () => import("../pages/time-card/Daily")
            //         },
            //     ]
            // },
            // {
            //     path: "final-teaching-assignment/faculty",
            //     component: () => import("../layouts/Sub"),
            //     children: [
            //         {
            //             path: "",
            //             name: "final-teaching-assignment-faculty-list",
            //             component: () => import("../pages/final-teaching-assignment/faculty/List")
            //         },
            //         {
            //             path: ":operation/:finalTeachingAssignmentId?",
            //             name: "final-teaching-assignment-faculty-form",
            //             component: () => import("../pages/final-teaching-assignment/faculty/Form")
            //         },
            //     ]
            // },
        ]
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;
