import { Notify } from "quasar";
import settings from "../../app/settings.json";
import { api, axios } from "../../boot/axios";

export const service = new services(settings).connect();

export const Api = {
  get: (url, id, params = {}) =>
    service.sendApi({ method: "get", url: url, id: id, params: params }),
  post: (url, value) =>
    service.sendApi({ method: "post", url: url, value: value }),
};

export const Notice = {
  success: (
    message,
    timeout = 2000,
    actions = [],
    icon = "eva-checkmark-outline"
  ) =>
    Notify.create({
      color: "green",
      caption: "Success!",
      position: "bottom",
      message: message,
      timeout: timeout,
      icon: icon,
      actions: actions,
    }),
  fail: (message, timeout = 2000, actions = [], icon = "eva-close-outline") =>
    Notify.create({
      color: "red",
      caption: "Failure!",
      position: "bottom",
      message: message,
      timeout: timeout,
      icon: icon,
      actions: actions,
    }),
  warn: (
    message,
    timeout = 2000,
    actions = [],
    icon = "eva-alert-triangle-outline"
  ) =>
    Notify.create({
      color: "orange",
      caption: "Warning!",
      position: "bottom",
      message: message,
      timeout: timeout,
      icon: icon,
      actions: actions,
    }),
  info: (message, timeout = 2000, actions = [], icon = "eva-info-outline") =>
    Notify.create({
      color: "blue",
      caption: "Information!",
      position: "bottom",
      message: message,
      timeout: timeout,
      icon: icon,
      actions: actions,
    }),
};

function services(setting) {
  let config, hostapi, secret;

  // this.authHeader = () => {
  //   const isLoggedIn = !!store.token;
  //   const isInCompany = !!store.company?.id
  //   if (isLoggedIn) {
  //     if (isInCompany) {
  //       return { Authorization: `Bearer ${store.token}`, Company: store.company.id };
  //     } else {
  //       return { Authorization: `Bearer ${store.token}` };
  //     }
  //   } else {
  //     return {};
  //   }
  // }

  this.sendApi = async (body) => {
    try {
      // token();
      const queryParams = body.params
        ? new URLSearchParams(body.params).toString()
        : null;
      // console.log(queryParams);
      // console.log(`??!! body`, body);
      // console.log(`aaaa => ${hostapi}`);
      let caller = await axios({
        headers: {
          "Content-Type":
            body.contenttype === "" ? "multipart/form-data" : body.contenttype,
        },
        baseURL: hostapi,
        method: body.method,
        url: body.url,
        // "/" +
        // body.name +
        // (body.id ? "/" + body.id : "") +
        // (queryParams ? "?" + queryParams : ""),
        // headers: this.authHeader(),
        data: body.value,
        responseType: body.responseType ? body.responseType : "json",
      });

      let result = await caller;

      if (!result.status && !config.production)
        Notice.fail(result.message, 3000);

      return result;
    } catch (error) {
      console.log(error);
      /** show error message from backend
       *   in development only
       */
      // Kick
      if (error.message == "Request failed with status code 401") {
        store.kick();
      }
      if (!config.production) Notice.fail(error.message);
      if (error.message)
        return {
          status: error.response.status,
          message: error.response.data,
          data: [],
        };
    }
  };
  this.connect = (isLogin = false) => {
    config = setting;
    if (!config) throw new Error("Invalid settings");
    if (typeof config.production !== "boolean")
      throw new Error("Invalid production settings");
    if (!config.api || !config.apidev) throw new Error("Invalid api settings");
    hostapi = config.production ? config.api : config.apidev;
    if (hostapi.length < 20) throw new Error("Invalid api host");
    return this;
  };
}
