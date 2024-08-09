<template>
  <q-header reveal elevated class="bg-negative text-white">
    <q-toolbar>
      <q-btn
        v-if="isLoggedIn && url != '/app/dashboard'"
        dense
        flat
        round
        icon="menu"
        @click="toggleLeftDrawer"
      />
      <q-avatar square class="q-ma-sm">
        <img src="../assets/Satnusa-White.png" />
      </q-avatar>
      <q-toolbar-title>
        <div class="LogoTitle">CORA Platform</div>
        <div v-if="isLoggedIn" class="LogoSubTitle">
          Advance Supply Chain Planning
        </div>
      </q-toolbar-title>
      <!-- user profile shown after login -->
      <q-btn
        v-if="isLoggedIn"
        class="q-mr-md q-mt-sm gt-sm"
        flat
        round
        dense
        @click="$q.fullscreen.toggle()"
      ></q-btn>
      <q-btn
        v-if="isLoggedIn"
        class="q-mr-md q-mt-sm"
        flat
        round
        dense
        @click="$q.dark.toggle()"
      ></q-btn>
      <div v-if="isLoggedIn" class="q-mr-md" style="text-align: end">
        <div class="text-h6 text-weight-light">
          <span class="gt-sm">John doe</span>

          <q-btn round flat dense class="q-ml-sm">
            <q-avatar size="32px">
              <q-img src="https://dummyjson.com/icon/emilys/128"></q-img>
            </q-avatar>
            <q-popup-proxy auto-close>
              <q-card style="width: 256px">
                <div class="row justify-center">
                  <q-card-section>
                    <div class="profile-image-border">
                      <q-avatar size="85px"> </q-avatar>
                    </div>
                  </q-card-section>
                </div>

                <q-separator></q-separator>
                <div class="row justify-center">
                  <q-card-section>
                    <div
                      class="row justify-center text-center text-h6 text-weight-light"
                    ></div>
                    <div
                      class="row justify-center text-center text-caption text-weight-light"
                    ></div>
                  </q-card-section>
                </div>
                <q-separator></q-separator>
                <q-card-actions>
                  <q-btn
                    flat
                    color="primary"
                    class="full-width"
                    label="Logout"
                    @click="authStore.logout()"
                  ></q-btn>
                </q-card-actions>
              </q-card>
            </q-popup-proxy>
          </q-btn>
        </div>
      </div>
    </q-toolbar>
  </q-header>

  <q-drawer v-model="leftDrawerOpen" side="left" elevated>
    <!-- drawer content -->
  </q-drawer>
</template>

<script>
import { useAuthStore } from "src/app/stores/auth-store";
import { ref } from "vue";

export default {
  name: "HeaderComponent",
  data() {
    return {
      isLoggedIn: false,
      authStore: useAuthStore(),
      url: this.$route.path,
    };
  },
  setup() {
    const leftDrawerOpen = ref(false);

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
  mounted() {
    this.isLoggedIn = !!this.authStore.badge;
  },
};
</script>

<style scoped>
.LogoTitle {
  margin-top: auto;
  font-size: 20px;
  font-weight: bold;
}

.LogoSubTitle {
  margin-top: -4px;
  font-size: 12px;
}
</style>
