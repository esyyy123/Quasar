<template>
  <q-layout view="hHh lpR fFf" ref="layoutRef">
    <q-header :elevated="!$q.dark.isActive" class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
        <q-avatar size="80px" style="width: 40px">
          <q-img src=""></q-img>
        </q-avatar>
        <q-toolbar-title>
          <span class="">APS</span>
        </q-toolbar-title>
        <q-btn
          class="q-mr-md q-mt-sm gt-sm"
          flat
          round
          dense
          @click="$q.fullscreen.toggle()"
        ></q-btn>
        <q-btn
          class="q-mr-md q-mt-sm"
          flat
          round
          dense
          @click="$q.dark.toggle()"
        ></q-btn>
        <div class="q-mr-md" style="text-align: end">
          <div class="text-h6 text-weight-light">
            <span class="gt-sm">aaaa</span>

            <q-btn round flat dense class="q-ml-sm">
              <q-avatar size="32px">
                <q-img src=""></q-img>
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
                      @click="confirmLogoutDialog = true"
                    ></q-btn>
                  </q-card-actions>
                </q-card>
              </q-popup-proxy>
            </q-btn>
          </div>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" bordered>
      <q-list>
        <q-item to="/home" exact>
          <q-item-section>
            <q-item-label>Home</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/about">
          <q-item-section>
            <q-item-label>About</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/services">
          <q-item-section>
            <q-item-label>Services</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/contact">
          <q-item-section>
            <q-item-label>Contact</q-item-label>
          </q-item-section>
        </q-item>
        <!-- Tambahkan item lain di sini sesuai kebutuhan -->
      </q-list>
    </q-drawer>

    <q-page-container>
      <q-page>
        <router-view></router-view>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  data() {
    return {
      leftDrawerOpen: false,
      confirmLogoutDialog: false,
    };
  },
  methods: {
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen;
    },
  },
};
</script>
