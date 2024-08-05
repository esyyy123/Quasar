<template>
  <q-page class="flex flex-center auth-background">
    <div style="width: 500px">
      <q-responsive :ratio="3.5 / 4">
        <q-card class="auth-card shadow-16">
          <q-form @submit="emitLoginCheck">
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
            </q-card-section>
          </q-form>
        </q-card>
      </q-responsive>
    </div>
  </q-page>
</template>

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

<script>
import { colors } from "quasar";
import { Api, Notice } from "src/app/services/service";

export default {
  data() {
    return {
      username: "",
      password: "",
      passwordHide: true,
    };
  },
  mounted() {
    const { getPaletteColor } = colors;
    console.log(getPaletteColor);
    this.testApi();
  },
  methods: {
    async testApi() {
      const response = await Api.get("www.google.com");
      console.log(response);
    },
  },
};
</script>
