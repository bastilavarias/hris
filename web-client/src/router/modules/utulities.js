export default [
  {
    path: "building",
    component: () => import("../../layouts/Sub"),
    children: [
      {
        path: "",
        name: "building-list",
        component: () => import("../../pages/building/List")
      },
      {
        path: ":operation/:buildingId?",
        name: "building-form",
        component: () => import("../../pages/building/Form")
      }
    ]
  }
];
