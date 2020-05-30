import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";
import { CHECK_ACCOUNT_AUTHENTICATION } from "../store/types/account";

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
    meta: {
      requiresAuth: true,
    },
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
        path: "personnel-management",
        component: () => import("../layouts/partials/Sub"),
        children: [
          {
            path: "",
            name: "personnel-list",
            component: () => import("../pages/personnel/List"),
            meta: {
              breadcrumbs: [
                {
                  text: "Personnel List",
                  icon: "mdi-clipboard-list-outline",
                  to: { name: "personnel-list" },
                },
              ],
            },
          },
          {
            path: "create",
            name: "personnel-form",
            component: () => import("../pages/personnel/Form"),
            meta: {
              breadcrumbs: [
                {
                  text: "Personnel List",
                  icon: "mdi-clipboard-list-outline",
                  to: { name: "personnel-list" },
                },
                {
                  text: "Personnel Form",
                  icon: "mdi-form-select",
                  to: { name: "personnel-form" },
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
        path: "final-teaching-assignment-management",
        component: () => import("../layouts/partials/Sub"),
        children: [
          {
            path: "",
            name: "faculty-teaching-assignment-list",
            component: () =>
              import("../pages/faculty-teaching-assignment/List"),
            meta: {
              breadcrumbs: [
                {
                  text: "Faculty Teaching Assignment List",
                  icon: "mdi-clipboard-list-outline",
                  to: { name: "faculty-teaching-assignment-list" },
                },
              ],
            },
          },
          {
            path: "adder",
            name: "faculty-teaching-assignment-adder",
            component: () =>
              import("../pages/faculty-teaching-assignment/Adder"),
            meta: {
              breadcrumbs: [
                {
                  text: "Faculty Teaching Assignment List",
                  icon: "mdi-clipboard-list-outline",
                  to: { name: "faculty-teaching-assignment-list" },
                },
                {
                  text: "Faculty Teaching Assignment Adder",
                  icon: "mdi-file-table-box-outline",
                  to: { name: "faculty-teaching-assignment-adder" },
                },
              ],
            },
          },
        ],
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
        path: "personnel-schedule-tagger",
        name: "personnel-schedule-tagger",
        component: () => import("../pages/PersonnelScheduleTagger"),
        meta: {
          breadcrumbs: [
            {
              text: "Personnel Schedule Tagger",
              icon: "mdi-file-table-box-outline",
              to: { name: "personnel-schedule-tagger" },
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

      {
        path: "building-management",
        name: "building-list",
        component: () => import("../pages/building/List"),
        meta: {
          breadcrumbs: [
            {
              text: "Building List",
              icon: "mdi-clipboard-list-outline",
              to: { name: "building-list" },
            },
          ],
        },
        children: [
          {
            path: "create",
            name: "building-form",
            component: () => import("../pages/building/Form"),
            meta: {
              breadcrumbs: [
                {
                  text: "Building List",
                  icon: "mdi-clipboard-list-outline",
                  to: { name: "building-list" },
                },
                {
                  text: "Building Form",
                  icon: "mdi-form-select",
                  to: { name: "building-form" },
                },
              ],
            },
          },
        ],
      },

      {
        path: "room-management",
        name: "room-list",
        component: () => import("../pages/room/List"),
        meta: {
          breadcrumbs: [
            {
              text: "Room List",
              icon: "mdi-clipboard-list-outline",
              to: { name: "room-list" },
            },
          ],
        },
        children: [
          {
            path: "create",
            name: "room-form",
            component: () => import("../pages/room/Form"),
            meta: {
              breadcrumbs: [
                {
                  text: "Room List",
                  icon: "mdi-clipboard-list-outline",
                  to: { name: "room-list" },
                },
                {
                  text: "Room Form",
                  icon: "mdi-form-select",
                  to: { name: "room-form" },
                },
              ],
            },
          },
        ],
      },

      {
        path: "semester-management",
        name: "semester-list",
        component: () => import("../pages/semester/List"),
        meta: {
          breadcrumbs: [
            {
              text: "Semester List",
              icon: "mdi-clipboard-list-outline",
              to: { name: "semester-list" },
            },
          ],
        },
        children: [
          {
            path: "create",
            name: "semester-form",
            component: () => import("../pages/semester/Form"),
            meta: {
              breadcrumbs: [
                {
                  text: "Semester List",
                  icon: "mdi-clipboard-list-outline",
                  to: { name: "semester-list" },
                },
                {
                  text: "Semester Form",
                  icon: "mdi-form-select",
                  to: { name: "semester-form" },
                },
              ],
            },
          },
        ],
      },

      {
        path: "school-year-management",
        name: "school-year-list",
        component: () => import("../pages/school-year/List"),
        meta: {
          breadcrumbs: [
            {
              text: "School Year List",
              icon: "mdi-clipboard-list-outline",
              to: { name: "school-year-list" },
            },
          ],
        },
        children: [
          {
            path: "create",
            name: "school-year-form",
            component: () => import("../pages/school-year/Form"),
            meta: {
              breadcrumbs: [
                {
                  text: "School Year List",
                  icon: "mdi-clipboard-list-outline",
                  to: { name: "school-year-list" },
                },
                {
                  text: "School Year Form",
                  icon: "mdi-form-select",
                  to: { name: "school-year-form" },
                },
              ],
            },
          },
        ],
      },

      {
        path: "year-level-management",
        name: "year-level-list",
        component: () => import("../pages/year-level/List"),
        meta: {
          breadcrumbs: [
            {
              text: "Year Level List",
              icon: "mdi-clipboard-list-outline",
              to: { name: "year-level-list" },
            },
          ],
        },
        children: [
          {
            path: "create",
            name: "year-level-form",
            component: () => import("../pages/year-level/Form"),
            meta: {
              breadcrumbs: [
                {
                  text: "Year Level List",
                  icon: "mdi-clipboard-list-outline",
                  to: { name: "year-level-list" },
                },
                {
                  text: "Year Level Form",
                  icon: "mdi-form-select",
                  to: { name: "year-level-form" },
                },
              ],
            },
          },
        ],
      },

      {
        path: "salary-maintenance",
        component: () => import("../layouts/partials/Sub.vue"),
        children: [
          {
            path: "",
            name: "salary-list",
            component: () => import("../pages/salary/List"),
            meta: {
              breadcrumbs: [
                {
                  text: "Salary List",
                  icon: "mdi-clipboard-list-outline",
                  to: { name: "salary-list" },
                },
              ],
            },
          },
          {
            path: "create",
            name: "salary-form",
            component: () => import("../pages/salary/Form"),
            meta: {
              breadcrumbs: [
                {
                  text: "Salary List",
                  icon: "mdi-clipboard-list-outline",
                  to: { name: "salary-list" },
                },
                {
                  text: "Salary Form",
                  icon: "mdi-form-select",
                  to: { name: "salary-form" },
                },
              ],
            },
          },
        ],
      },

      {
        path: "employee-leave-management",
        name: "employee-leave-list",
        component: () => import("../pages/employee-leave/List"),
        meta: {
          breadcrumbs: [
            {
              text: "Employee Leave List",
              icon: "mdi-clipboard-list-outline",
              to: { name: "employee-leave-list" },
            },
          ],
        },
        children: [
          {
            path: "create",
            name: "employee-leave-form",
            component: () => import("../pages/employee-leave/Form"),
            meta: {
              breadcrumbs: [
                {
                  text: "Employee Leave List",
                  icon: "mdi-clipboard-list-outline",
                  to: { name: "employee-leave-list" },
                },
                {
                  text: "Employee Leave Form",
                  icon: "mdi-form-select",
                  to: { name: "employee-leave-form" },
                },
              ],
            },
          },
        ],
      },

      {
        path: "personal-leave-management",
        name: "personal-leave-list",
        component: () => import("../pages/personal-leave/List"),
        meta: {
          breadcrumbs: [
            {
              text: "Personal Leave List",
              icon: "mdi-clipboard-list-outline",
              to: { name: "personal-leave-list" },
            },
          ],
        },
        children: [
          {
            path: "create",
            name: "personal-leave-form",
            component: () => import("../pages/personal-leave/Form"),
            meta: {
              breadcrumbs: [
                {
                  text: "Personal Leave List",
                  icon: "mdi-clipboard-list-outline",
                  to: { name: "personal-leave-list" },
                },
                {
                  text: "Personal Leave Form",
                  icon: "mdi-form-select",
                  to: { name: "personal-leave-form" },
                },
              ],
            },
          },
        ],
      },

      {
        path: "personal-final-teaching-assignment-maintenance",
        component: () => import("../layouts/partials/Sub"),
        children: [
          {
            path: "",
            name: "personal-final-teaching-assignment-list",
            component: () =>
              import("../pages/personal-final-teaching-assignment/List"),
            meta: {
              breadcrumbs: [
                {
                  text: "Personal FTA List",
                  icon: "mdi-clipboard-list-outline",
                  to: { name: "personal-final-teaching-assignment-list" },
                },
              ],
            },
          },
          {
            path: "adder",
            name: "personal-final-teaching-assignment-adder",
            component: () =>
              import("../pages/personal-final-teaching-assignment/Adder"),
            meta: {
              breadcrumbs: [
                {
                  text: "Personal FTA List",
                  icon: "mdi-clipboard-list-outline",
                  to: { name: "personal-final-teaching-assignment-list" },
                },
                {
                  text: "Personal FTA Adder",
                  icon: "mdi-file-table-box-outline",
                  to: { name: "personal-final-teaching-assignment-adder" },
                },
              ],
            },
          },
        ],
      },

      {
        path: "/activity-log",
        name: "activity-log",
        component: () => import("../pages/ActivityLog"),
        meta: {
          breadcrumbs: [
            {
              text: "Activity Log",
              icon: "mdi-clipboard-list-outline",
              to: { name: "activity-log" },
            },
          ],
        },
      },

      {
        path: "personnel-schedule-viewer",
        name: "personnel-schedule-viewer",
        component: () => import("../pages/PersonnelScheduleViewer"),
        meta: {
          breadcrumbs: [
            {
              text: "Schedule Viewer",
              icon: "mdi-calendar-outline",
              to: { name: "personnel-schedule-viewer" },
            },
          ],
        },
      },

      {
        path: "personnel-leave-management",
        name: "personnel-leave-list",
        component: () => import("../pages/personnel-leave/List"),
        meta: {
          breadcrumbs: [
            {
              text: "Personnel Leave List",
              icon: "mdi-clipboard-list-outline",
              to: { name: "personnel-leave-list" },
            },
          ],
        },
        children: [
          {
            path: "create",
            name: "personnel-leave-form",
            component: () => import("../pages/personnel-leave/Form"),
            meta: {
              breadcrumbs: [
                {
                  text: "Personnel Leave List",
                  icon: "mdi-clipboard-list-outline",
                  to: { name: "personnel-leave-list" },
                },
                {
                  text: "Personnel Leave Form",
                  icon: "mdi-form-select",
                  to: { name: "personnel-leave-form" },
                },
              ],
            },
          },
        ],
      },

      {
        path: "faculty-leave-management",
        name: "faculty-leave-list",
        component: () => import("../pages/faculty-leave/List"),
        meta: {
          breadcrumbs: [
            {
              text: "Faculty Leave List",
              icon: "mdi-clipboard-list-outline",
              to: { name: "faculty-leave-list" },
            },
          ],
        },
        children: [
          {
            path: "create",
            name: "faculty-leave-form",
            component: () => import("../pages/faculty-leave/Form"),
            meta: {
              breadcrumbs: [
                {
                  text: "Faculty Leave List",
                  icon: "mdi-clipboard-list-outline",
                  to: { name: "faculty-leave-list" },
                },
                {
                  text: "Faculty Leave Form",
                  icon: "mdi-form-select",
                  to: { name: "faculty-leave-form" },
                },
              ],
            },
          },
        ],
      },

      {
        path: "account-action-management",
        name: "account-action-list",
        component: () => import("../pages/account-action/List"),
        meta: {
          breadcrumbs: [
            {
              text: "Account Action List",
              icon: "mdi-clipboard-list-outline",
              to: { name: "account-action-list" },
            },
          ],
        },
        children: [
          {
            path: "create",
            name: "account-action-form",
            component: () => import("../pages/account-action/Form"),
            meta: {
              breadcrumbs: [
                {
                  text: "Account Action List",
                  icon: "mdi-clipboard-list-outline",
                  to: { name: "account-action-list" },
                },
                {
                  text: "Account Action Form",
                  icon: "mdi-form-select",
                  to: { name: "account-action-form" },
                },
              ],
            },
          },
        ],
      },

      {
        path: "authorization-management",
        name: "authorization-list",
        component: () => import("../pages/authorization/List"),
        meta: {
          breadcrumbs: [
            {
              text: "Authorization List",
              icon: "mdi-clipboard-list-outline",
              to: { name: "authorization-list" },
            },
          ],
        },
        children: [
          {
            path: "create",
            name: "authorization-form",
            component: () => import("../pages/authorization/Form"),
            meta: {
              breadcrumbs: [
                {
                  text: "Authorization List",
                  icon: "mdi-clipboard-list-outline",
                  to: { name: "authorization-list" },
                },
                {
                  text: "Authorization Form",
                  icon: "mdi-form-select",
                  to: { name: "authorization-form" },
                },
              ],
            },
          },
        ],
      },

      {
        path: "bundy-clock",
        name: "bundy-clock-search",
        component: () => import("../pages/bundy-clock/Search"),
        meta: {
          breadcrumbs: [
            {
              text: "Search Employee",
              icon: "mdi-account-search-outline",
              to: { name: "bundy-clock-search" },
            },
          ],
        },
        children: [
          {
            path: ":employeeId",
            name: "bundy-clock-form",
            component: () => import("../pages/bundy-clock/Form"),
            meta: {
              breadcrumbs: [
                {
                  text: "Search Employee",
                  icon: "mdi-account-search-outline",
                  to: { name: "bundy-clock-search" },
                },

                {
                  text: "Employee Form",
                  icon: "mdi-form-select",
                  to: { name: "bundy-clock-form" },
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

router.beforeEach(async (to, from, next) => {
  await store.dispatch(CHECK_ACCOUNT_AUTHENTICATION);
  const isAuthenticated = store.state.account.isAuthenticated;
  const isProtectedRoute = to.matched.some(
    (record) => record.meta.requiresAuth
  );
  if (isProtectedRoute && !isAuthenticated) return next({ name: "login" });
  if (to.name === "login" && isAuthenticated) {
    const currentAccount = store.state.account.current;
    const redirectTo = currentAccount.actions[0].to;
    return next(redirectTo);
  }
  next();
});

export default router;
