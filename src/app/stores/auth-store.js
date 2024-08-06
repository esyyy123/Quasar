import { defineStore } from "pinia";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    badge: null,
    token: null,
    refreshToken: null,
  }),
  actions: {
    login(badge, token, refreshToken) {
      this.badge = badge;
      this.token = token;
      this.refreshToken = refreshToken;
      console.log("auth store", { badge, token, refreshToken });
      this.router.push("app/dashboard");
    },
  },
  persist: {
    enabled: true,
  },
});
