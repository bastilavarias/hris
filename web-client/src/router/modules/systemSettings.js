export default [
  {
    path: "semester-management",
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
  }
];
