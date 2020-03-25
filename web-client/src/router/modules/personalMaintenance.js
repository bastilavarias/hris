export default [
    {
        path: "personal-schedule",
        name: "personal-schedule",
        component: () => import("../../pages/schedule/Personal"),
    },

    {
        path: "personal-data-sheet",
        name: "personal-data-sheet",
        component: () => import("../../pages/personal-data-sheet/Form"),
    },
];