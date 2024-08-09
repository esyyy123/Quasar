import loginRoutes from "./login/routes";

const routes = [
  {
    path: "/auth",
    component: () => import("../layouts/LayoutPage.vue"),
    children: [...loginRoutes],
  },
];

export default routes;
