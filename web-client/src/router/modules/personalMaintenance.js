export default [
    {
        path: "personal-personnel-schedule",
        name: "personal-personnel-schedule",
        component: () => import("../../pages/schedule/PersonalPersonnel"),
    },

    {
        path: "personal-data-sheet",
        name: "personal-data-sheet",
        component: () => import("../../pages/personal-data-sheet/Form"),
    },
];