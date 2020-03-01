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
                path: "daily-time-record",
                name: "daily-time-record",
                component: () => import("../pages/home/DailyTimeRecord")
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
