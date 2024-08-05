import dashboardRoutes from "./dashboard/routes";

const routes = [
  {
    path: "/app",
    component: () => import("layouts/DefaultLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("src/app/layouts/IndexPage.vue"),
        children: [...dashboardRoutes],
      },
    ],
  },
];

export default routes;
