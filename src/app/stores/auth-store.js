import { defineStore } from "pinia";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    token: null,
    user: null,
  }),
  actions: {
    login(user, token) {
      this.user = user;
      this.token = token;
      this.router.push("app/dashboard");
    },
  },
});
