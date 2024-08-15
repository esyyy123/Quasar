<template>
  <q-page class="flex flex-center">
    <div class="row wrap">
      <div
        class="q-pa-sm col-xs-12 col-sm-6 col-md-3"
        v-for="menu in menuList"
        :key="menu.menuName"
        :bind="menu.iconName"
      >
        <!-- {{ Math.random() }} -->
        <q-card class="menu-container" @click="moveTo(menu.route)">
          <q-card-section class="menu-icon">
            <q-icon :name="menu.iconName" size="xl"></q-icon>
          </q-card-section>
          <q-card-section class="menu-detail">
            {{ menu.menuName }}
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import router from "../../../router/routes";

export default {
  name: "MenuCard",
  data() {
    console.log("menu card");
    return {
      menuList: [
        // {
        //   iconName: "login",
        //   menuName: "Login",
        //   route: "login",
        // },
        {
          iconName: "schedule",
          menuName: "Scheduler",
          route: "scheduler",
        },
        // {
        //   iconName: "logout",
        //   menuName: "Logout",
        //   route: "logout",
        // },
        // {
        //   iconName: "refresh",
        //   menuName: "refresh",
        //   route: "refresh",
        // },
        // {
        //   iconName: "schedule",
        //   menuName: "Scheduler",
        //   route: "scheduler",
        // },
        // {
        //   iconName: "logout",
        //   menuName: "Logout",
        //   route: "logout",
        // },
        // {
        //   iconName: "refresh",
        //   menuName: "refresh",
        //   route: "refresh",
        // },
        // {
        //   iconName: "app_registration",
        //   menuName: "regis",
        //   route: "regis",
        // },
        // {
        //   iconName: "logout",
        //   menuName: "Logout",
        //   route: "logout",
        // },
        // {
        //   iconName: "refresh",
        //   menuName: "refresh",
        //   route: "refresh",
        // },
        // {
        //   iconName: "app_registration",
        //   menuName: "regis",
        //   route: "regis",
        // },
        // {
        //   iconName: "download_for_offline",
        //   menuName: "download",
        //   route: "download",
        // },
        // {
        //   iconName: "create_new_folder",
        //   menuName: "new folder",
        //   route: "new folder",
        // },
        // {
        //   iconName: "app_registration",
        //   menuName: "regis",
        //   route: "regis",
        // },
        // {
        //   iconName: "schedule",
        //   menuName: "Scheduler",
        //   route: "scheduler",
        // },
        // {
        //   iconName: "app_registration",
        //   menuName: "regis",
        //   route: "regis",
        // },
        // {
        //   iconName: "download_for_offline",
        //   menuName: "download",
        //   route: "download",
        // },
        // {
        //   iconName: "create_new_folder",
        //   menuName: "new folder",
        //   route: "new folder",
        // },
        // {
        //   iconName: "logout",
        //   menuName: "Logout",
        //   route: "logout",
        // },
        // {
        //   iconName: "refresh",
        //   menuName: "refresh",
        //   route: "refresh",
        // },
        // {
        //   iconName: "app_registration",
        //   menuName: "regis",
        //   route: "regis",
        // },
        // {
        //   iconName: "schedule",
        //   menuName: "Scheduler",
        //   route: "scheduler",
        // },
        // {
        //   iconName: "app_registration",
        //   menuName: "regis",
        //   route: "regis",
        // },
        // {
        //   iconName: "download_for_offline",
        //   menuName: "download",
        //   route: "download",
        // },
        // {
        //   iconName: "create_new_folder",
        //   menuName: "new folder",
        //   route: "new folder",
        // },
        // {
        //   iconName: "logout",
        //   menuName: "Logout",
        //   route: "logout",
        // },
        // {
        //   iconName: "schedule",
        //   menuName: "Scheduler",
        //   route: "scheduler",
        // },
        // {
        //   iconName: "logout",
        //   menuName: "Logout",
        //   route: "logout",
        // },
        // {
        //   iconName: "refresh",
        //   menuName: "refresh",
        //   route: "refresh",
        // },
        // {
        //   iconName: "app_registration",
        //   menuName: "regis",
        //   route: "regis",
        // },
        // {
        //   iconName: "refresh",
        //   menuName: "refresh",
        //   route: "refresh",
        // },
        // {
        //   iconName: "app_registration",
        //   menuName: "regis",
        //   route: "regis",
        // },
        // {
        //   iconName: "download_for_offline",
        //   menuName: "download",
        //   route: "download",
        // },
        // {
        //   iconName: "create_new_folder",
        //   menuName: "new folder",
        //   route: "new folder",
        // },
        // {
        //   iconName: "create_new_folder",
        //   menuName: "new folder",
        //   route: "new folder",
        // },
      ],
    };
  },
  methods: {
    Refresh() {
      router.push("/auth/login");
      console.log(window.location);
    },
    moveTo(route) {
      this.$router.push(`/app/${route}`);
    },
  },
};
</script>

<style scoped>
.menu-container {
  min-width: 200px;
  max-width: 250px;
}

.menu-container:hover {
  background-color: #f9f9f9;
  cursor: pointer;
}

.menu-icon {
  text-align: center;
  padding-top: 2vh;
  color: #c10015;
}

.menu-detail {
  text-align: center;
  font-size: medium;
  font-weight: bold;
}
</style>
