import dashboardRoutes from "./dashboard/routes";
import schedulerPage from "./scheduler/routes";

const routes = [
  {
    path: "/app",
    component: () => import("./layouts/LayoutPage.vue"),
    children: [
      {
        path: "",
        // component: () => import("src/app/layouts/IndexPage.vue"),
        children: [...dashboardRoutes, ...schedulerPage],
      },
      // {
      //   path: "dashboard",
      //   component: () => import("src/app/dashboard/views/DashboardPage.vue"),
      // },
      // {
      //   path: "/schedule",
      //   component: () => import("src/app/layouts/IndexPage.vue"),
      //   children: [...reportRoutes, ...scheduleRoutes],
      // },
    ],
  },
];

export default routes;
