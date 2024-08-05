import { defineStore } from "pinia";

export const pageLoader = defineStore({
  id: "load",
  state: () => ({
    status: false,
  }),
  actions: {
    start() {
      this.status = true;
    },
    stop() {
      this.status = false;
    },
  },
});
