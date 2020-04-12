export default [
  {
    path: "building-management",
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
  },

  {
    path: "room-management",
    component: () => import("../../layouts/Sub"),
    children: [
      {
        path: "",
        name: "room-list",
        component: () => import("../../pages/room/List")
      },
      {
        path: ":operation/:roomId?",
        name: "room-form",
        component: () => import("../../pages/room/Form")
      }
    ]
  }
];
