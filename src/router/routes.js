import authRoutes from "src/app/auth/routes";
import appRoutes from "src/app/routes";

const baseRoutes = [
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

const allRoutes = [...baseRoutes, ...authRoutes, ...appRoutes];

export default allRoutes;
