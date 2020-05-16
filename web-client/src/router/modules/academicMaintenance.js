export default [
  {
    path: "subject-management",
    name: "subject-list",
    component: () => import("../../pages/subject/List"),
    children: [
      {
        path: ":operation/:subjectId?",
        name: "subject-form",
        component: () => import("../../pages/subject/Form"),
      },
    ],
  },

  {
    path: "college-management",
    name: "college-list",
    component: () => import("../../pages/college/List"),
    children: [
      {
        path: ":operation/:collegeId?",
        name: "college-form",
        component: () => import("../../pages/college/Form"),
      },
    ],
  },

  {
    path: "course-management",
    component: () => import("../../layouts/Sub"),
    children: [
      {
        path: "",
        name: "course-list",
        component: () => import("../../pages/course/List"),
      },
      {
        path: ":operation/:courseId?",
        name: "course-form",
        component: () => import("../../pages/course/Form"),
      },
    ],
  },

  {
    path: "section-management",
    component: () => import("../../layouts/Sub"),
    children: [
      {
        path: "",
        name: "section-list",
        component: () => import("../../pages/section/List"),
      },
      {
        path: ":operation/:sectionId?",
        name: "section-form",
        component: () => import("../../pages/section/Form"),
      },
    ],
  },
];
