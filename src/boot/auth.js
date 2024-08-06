import { Notify } from "quasar";
import { axiosInstance } from "./axios";
import auth from "../store/auth";

export default ({ app, router, store, Vue }) => {
  store.registerModule("auth", auth);
  var helper = {};
  helper.register = (data) => {
    return store.dispatch("auth/register", data);
  };
  helper.loggedIn = () => {
    return store.getters["auth/loggedIn"];
  };
  helper.check = (roles) => {
    return store.getters["auth/check"](roles);
  };
  helper.login = async (data) => {
    return store.dispatch("auth/login", data);
  };
  helper.setToken = (token) => {
    return store.dispatch("auth/setToken", token);
  };
  helper.logout = () => {
    return store.dispatch("auth/logout");
  };
  helper.verify = (token) => {
    return store.dispatch("auth/verify", token);
  };
  helper.passwordForgot = (data) => {
    return store.dispatch("auth/passwordForgot", data);
  };
  helper.passwordReset = (data) => {
    return store.dispatch("auth/passwordReset", data);
  };
  helper.fetch = () => {
    return store.dispatch("auth/fetch");
  };
  helper.user = () => {
    return store.getters["auth/user"];
  };
  Vue.prototype.$auth = helper;
};
