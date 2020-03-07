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
