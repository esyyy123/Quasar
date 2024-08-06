import loginRoutes from "./login/routes";

const routes = [
  {
    path: "/auth",
    component: () => import("../layouts/AuthPage.vue"),
    children: [...loginRoutes],
  },
];

export default routes;
