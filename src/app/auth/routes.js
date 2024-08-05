import loginRoutes from "./login/routes";

const routes = [
  {
    path: "/auth",
    component: () => import("../layouts/AuthPage.vue"),
    children: [...loginRoutes],
  },
];

console.log("auth");

export default routes;
