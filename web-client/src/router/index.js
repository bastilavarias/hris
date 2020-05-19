import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "",
    name: "login",
    component: () => import("../pages/Login"),
  },

  {
    path: "/home",
    component: () => import("../layouts/Home"),
    children: [
      {
        path: "employee-management",
        component: () => import("../layouts/partials/Sub"),
        children: [
          {
            path: "",
            name: "employee-list",
            component: () => import("../pages/employee/List"),
            meta: {
              breadcrumbs: [
                {
                  text: "Employee List",
                  icon: "mdi-clipboard-list-outline",
                  to: { name: "employee-list" },
                },
              ],
            },
          },
          {
            path: "create",
            name: "employee-form",
            component: () => import("../pages/employee/Form"),
            meta: {
              breadcrumbs: [
                {
                  text: "Employee List",
                  icon: "mdi-clipboard-list-outline",
                  to: { name: "employee-list" },
                },
                {
                  text: "Employee Form",
                  icon: "mdi-form-select",
                  to: { name: "employee-form" },
                },
              ],
            },
          },
        ],
      },

      {
        path: "department-management",
        name: "department-list",
        component: () => import("../pages/department/List"),
        meta: {
          breadcrumbs: [
            {
              text: "Department List",
              icon: "mdi-clipboard-list-outline",
              to: { name: "department-list" },
            },
          ],
        },
        children: [
          {
            path: "create",
            name: "department-form",
            component: () => import("../pages/department/Form"),
            meta: {
              breadcrumbs: [
                {
                  text: "Department List",
                  icon: "mdi-clipboard-list-outline",
                  to: { name: "department-list" },
                },
                {
                  text: "Department Form",
                  icon: "mdi-form-select",
                  to: { name: "department-form" },
                },
              ],
            },
          },
        ],
      },

      {
        path: "designation-management",
        name: "designation-list",
        component: () => import("../pages/designation/List"),
        meta: {
          breadcrumbs: [
            {
              text: "Designation List",
              icon: "mdi-clipboard-list-outline",
              to: { name: "designation-list" },
            },
          ],
        },
        children: [
          {
            path: "create",
            name: "designation-form",
            component: () => import("../pages/designation/Form"),
            meta: {
              breadcrumbs: [
                {
                  text: "Designation List",
                  icon: "mdi-clipboard-list-outline",
                  to: { name: "designation-list" },
                },
                {
                  text: "Designation Form",
                  icon: "mdi-form-select",
                  to: { name: "designation-form" },
                },
              ],
            },
          },
        ],
      },

      {
        path: "faculty-teaching-assignment",
        name: "faculty-teaching-assignment-adder",
        component: () => import("../pages/faculty-teaching-assignment/Adder"),
        meta: {
          breadcrumbs: [
            {
              text: "Faculty Teaching Assignment Adder",
              icon: "mdi-file-table-box-outline",
              to: { name: "faculty-teaching-assignment-adder" },
            },
          ],
        },
      },

      {
        path: "personal-data-sheet",
        name: "personal-data-sheet",
        component: () => import("../pages/PersonalDataSheet"),
        meta: {
          breadcrumbs: [
            {
              text: "Personal Data Sheet",
              icon: "mdi-form-select",
              to: { name: "personal-data-sheet" },
            },
          ],
        },
      },

      {
        path: "employee-schedule-management",
        name: "employee-schedule-tagger",
        component: () => import("../pages/employee-schedule/Tagger"),
        meta: {
          breadcrumbs: [
            {
              text: "Employee Schedule Tagger",
              icon: "mdi-file-table-box-outline",
              to: { name: "employee-schedule-tagger" },
            },
          ],
        },
      },

      {
        path: "subject-management",
        name: "subject-list",
        component: () => import("../pages/subject/List"),
        meta: {
          breadcrumbs: [
            {
              text: "Subject List",
              icon: "mdi-clipboard-list-outline",
              to: { name: "subject-list" },
            },
          ],
        },
        children: [
          {
            path: "create",
            name: "subject-form",
            component: () => import("../pages/subject/Form"),
            meta: {
              breadcrumbs: [
                {
                  text: "Subject List",
                  icon: "mdi-clipboard-list-outline",
                  to: { name: "subject-list" },
                },
                {
                  text: "Subject Form",
                  icon: "mdi-form-select",
                  to: { name: "subject-form" },
                },
              ],
            },
          },
        ],
      },

      {
        path: "college-management",
        name: "college-list",
        component: () => import("../pages/college/List"),
        meta: {
          breadcrumbs: [
            {
              text: "College List",
              icon: "mdi-clipboard-list-outline",
              to: { name: "college-list" },
            },
          ],
        },
        children: [
          {
            path: "create",
            name: "college-form",
            component: () => import("../pages/college/Form"),
            meta: {
              breadcrumbs: [
                {
                  text: "College List",
                  icon: "mdi-clipboard-list-outline",
                  to: { name: "college-list" },
                },
                {
                  text: "College Form",
                  icon: "mdi-form-select",
                  to: { name: "college-form" },
                },
              ],
            },
          },
        ],
      },

      {
        path: "course-management",
        name: "course-list",
        component: () => import("../pages/course/List"),
        meta: {
          breadcrumbs: [
            {
              text: "Course List",
              icon: "mdi-clipboard-list-outline",
              to: { name: "course-list" },
            },
          ],
        },
        children: [
          {
            path: "create",
            name: "course-form",
            component: () => import("../pages/course/Form"),
            meta: {
              breadcrumbs: [
                {
                  text: "Course List",
                  icon: "mdi-clipboard-list-outline",
                  to: { name: "course-list" },
                },
                {
                  text: "Course Form",
                  icon: "mdi-form-select",
                  to: { name: "course-form" },
                },
              ],
            },
          },
        ],
      },

      {
        path: "section-management",
        name: "section-list",
        component: () => import("../pages/section/List"),
        meta: {
          breadcrumbs: [
            {
              text: "Section List",
              icon: "mdi-clipboard-list-outline",
              to: { name: "section-list" },
            },
          ],
        },
        children: [
          {
            path: "create",
            name: "section-form",
            component: () => import("../pages/section/Form"),
            meta: {
              breadcrumbs: [
                {
                  text: "Section List",
                  icon: "mdi-clipboard-list-outline",
                  to: { name: "section-list" },
                },
                {
                  text: "Section Form",
                  icon: "mdi-form-select",
                  to: { name: "section-form" },
                },
              ],
            },
          },
        ],
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
