export default [
  {
    path: "semester-setting",
    component: () => import("../../layouts/Sub"),
    children: [
      {
        path: "",
        name: "semester-list",
        component: () => import("../../pages/semester/List")
      },
      {
        path: ":operation/:collegeId?",
        name: "semester-form",
        component: () => import("../../pages/semester/Form")
      }
    ]
  },

  {
    path: "school-year-setting",
    name: "school-year-form",
    component: () => import("../../pages/school-year/Form.vue")
  },

  {
    path: "year-level-setting",
    component: () => import("../../layouts/Sub"),
    children: [
      {
        path: "",
        name: "year-level-list",
        component: () => import("../../pages/year-level/List")
      },
      {
        path: ":operation/:collegeId?",
        name: "year-level-form",
        component: () => import("../../pages/year-level/Form")
      }
    ]
  }
];
