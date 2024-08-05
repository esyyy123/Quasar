import { store } from "quasar/wrappers";
import { createPinia } from "pinia";
import { markRaw } from "vue";
import router from "src/router";
import piniaPluginPersistedState from "pinia-plugin-persistedstate";

export default store((/* { ssrContext } */) => {
  const pinia = createPinia();
  pinia.use(({ store }) => {
    store.router = markRaw(router);
  });
  pinia.use(piniaPluginPersistedState);

  console.log("from pinia");

  return pinia;
});
