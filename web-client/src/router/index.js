import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";
import { checkAccountToken } from "../store/types/account";
import personalMaintenance from "./modules/personalMaintenance";
import employeeMaintenance from "./modules/employeeMaintenance";
import academicMaintenance from "./modules/academicMaintenance";
import systemSettings from "./modules/systemSettings";
import utilities from "./modules/utulities";

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
      ...personalMaintenance,
      ...employeeMaintenance,
      ...academicMaintenance,
      ...systemSettings,
      ...utilities
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
