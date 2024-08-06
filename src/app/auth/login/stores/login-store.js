import { defineStore } from "pinia";

export const useLoginStore = defineStore({
  id: "login",
  state: () => ({
    badge: null,
    password: null,
  }),
  actions: {
    updateField(field, value) {
      if (Object.hasOwnProperty.call(this, field)) {
        this[field] = value;
      } else {
        console.warn(`No such field: ${field}`);
      }
    },
    clearField(field, value) {
      if (Object.hasOwnProperty.call(this, field)) {
        this[field] = null;
      } else {
        console.warn(`No such field: ${field}`);
      }
    },
  },
});
