<template>
  <q-page class="flex flex-center auth-background">
    <div style="width: 500px">
      <q-responsive :ratio="3.5 / 4">
        <q-card class="auth-card shadow-16">
          <q-form @submit="processLogin">
            <q-card-section class="text-center">
              <h4><strong>Login</strong></h4>
            </q-card-section>

            <q-card-section class="q-gutter-y-md q-mx-xl">
              Badge
              <q-input
                ref="badgeRef"
                outlined
                label="Enter your badge"
                v-model="badge"
                class="q-mb-md"
                mask="######"
                unmasked-value
              >
                <template v-slot:prepend>
                  <q-icon name="badge"></q-icon> </template
              ></q-input>
              Password
              <q-input
                ref="passwordRef"
                outlined
                label="Enter your password"
                :type="passwordHide ? 'password' : 'text'"
                v-model="password"
              >
                <template v-slot:prepend>
                  <q-icon name="key"></q-icon>
                </template>
                <template v-slot:append>
                  <q-icon
                    :name="passwordHide ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="passwordHide = !passwordHide"
                  /> </template
              ></q-input>
              <div class="row">
                <div class="col" style="text-align: end">
                  <q-btn
                    flat
                    dense
                    no-caps
                    color="dark"
                    label="Forgot Password?"
                    class="justify-center"
                    @click="$emit('click-forgot-password-page')"
                  ></q-btn>
                </div>
              </div>

              <q-btn
                label="Login →"
                no-caps
                class="full-width buttonLogin text-white q-pa-md"
                type="submit"
                dense
              ></q-btn>
              <!-- <q-btn @click="alert">asda</q-btn> -->
            </q-card-section>
          </q-form>
        </q-card>
      </q-responsive>
    </div>
  </q-page>
</template>

<script>
import { colors } from "quasar";
import { Api, Notice } from "src/app/services/service";
import { useAuthStore } from "src/app/stores/auth-store";
import { useLoginStore } from "../stores/login-store";
import { useQuasar } from "quasar";

export default {
  setup() {
    // function alert() {
    //   $q.dialog({
    //     title: "Alert",
    //     message: "Some message",
    //   })
    //     .onOk(() => {
    //       // console.log('OK')
    //     })
    //     .onCancel(() => {
    //       // console.log('Cancel')
    //     })
    //     .onDismiss(() => {
    //       // console.log('I am triggered on both OK and Cancel')
    //     });
    // }
    // return { alert };
  },
  data() {
    return {
      badge: "",
      password: "",
      passwordHide: true,
      token: null,
      refreshToken: null,
    };
  },
  mounted() {
    const store = useAuthStore();
    const loginStore = useLoginStore();
    console.log("store", store);
    console.log("loginStore", loginStore);
    //  const { getPaletteColor } = colors;
    //  console.log(getPaletteColor);
    // this.testApi();
  },
  methods: {
    async testApi() {
      const url = "https://dummyjson.com/auth/login";
      const payload = {
        username: "emilys",
        password: "emilyspass",
      };
      const response = await Api.post(url, payload);
      console.log(response);
    },
    loginFinal() {
      const store = useAuthStore();
      store.login(this.badge, this.token, this.refreshToken);
    },
    async processLogin() {
      const loginStore = useLoginStore();

      loginStore.updateField("badge", this.badge);
      loginStore.updateField("password", this.password);

      const payload = {
        username: "emilys",
        password: "emilyspass",
      };

      const { status, data } = await Api.post(
        "https://dummyjson.com/auth/login",
        payload
      );
      if (status == 200) {
        console.log(loginStore);
        console.log(data);
        this.badge = "200399";
        this.token = data.token;
        this.refreshToken = data.refreshToken;
        this.loginFinal();
        return {
          result: "success",
          data: data,
        };
      } else {
        console.log(loginStore);
        return {
          result: "error",
          data: data.error,
        };
      }
    },
  },
};
</script>

<style scoped>
.auth-background {
  background-color: #fafafa;
}
.auth-card {
  border-radius: 25px;
}
.buttonLogin {
  background-color: #cd2023;
  font-size: 14px !important;
}
</style>
