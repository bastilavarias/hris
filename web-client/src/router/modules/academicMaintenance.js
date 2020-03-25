export default [
    {
        path: "subject-management",
        component: () => import("../../layouts/Sub"),
        children: [
            {
                path: "",
                name: "subject-list",
                component: () => import("../../pages/subject/List")
            },
            {
                path: ":operation/:subjectId?",
                name: "subject-form",
                component: () => import("../../pages/subject/Form")
            }
        ]
    },

    {
        path: "college-management",
        component: () => import("../../layouts/Sub"),
        children: [
            {
                path: "",
                name: "college-list",
                component: () => import("../../pages/college/List")
            },
            {
                path: ":operation/:collegeId?",
                name: "college-form",
                component: () => import("../../pages/college/Form")
            }
        ]
    },

    {
        path: "course-management",
        component: () => import("../../layouts/Sub"),
        children: [
            {
                path: "",
                name: "course-list",
                component: () => import("../../pages/course/List")
            },
            {
                path: ":operation/:courseId?",
                name: "course-form",
                component: () => import("../../pages/course/Form")
            }
        ]
    }
];