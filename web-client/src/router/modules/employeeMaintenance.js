export default [
    {
        path: "designation-management",
        component: () => import("../../layouts/Sub"),
        children: [
            {
                path: "",
                name: "designation-management",
                component: () => import("../../pages/designation/List")
            },
            {
                path: ":operation/:designationId?",
                name: "designation-form",
                component: () => import("../../pages/designation/Form")
            }
        ]
    },

    {
        path: "department-management",
        component: () => import("../../layouts/Sub"),
        children: [
            {
                path: "",
                name: "department-list",
                component: () => import("../../pages/department/List")
            },
            {
                path: ":operation/:departmentId?",
                name: "department-form",
                component: () => import("../../pages/department/Form")
            }
        ]
    },

    {
        path: "employee-management",
        component: () => import("../../layouts/Sub"),
        children: [
            {
                path: "",
                name: "employee-list",
                component: () => import("../../pages/employee/List")
            },
            {
                path: "create",
                name: "employee-create-form",
                component: () => import("../../pages/employee/CreateForm")
            },
            {
                path: "update/:employeeId",
                name: "employee-update-form",
                component: () => import("../../pages/employee/UpdateForm")
            }
        ]
    }
];