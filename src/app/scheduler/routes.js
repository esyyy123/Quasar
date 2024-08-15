const routes = [
  {
    path: "scheduler",
    component: () => import("./views/SchedulerPage.vue"),
  },
  {
    path: "scheduler/reports/daily-production-confirmation",
    component: () => import("./views/ReportDailyProductionConfirmation.vue"),
  },
  // {
  //   path: "scheduler/reports/schedule-summary",
  //   component: () => import("./views/ReportScheduleSummary.vue"),
  // },
];

export default routes;
