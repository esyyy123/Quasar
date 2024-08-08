<template>
  <q-page class="flex flex-center">
    <div class="row">
      <div
        class="q-pa-sm col-xs-12 col-sm-6 col-md-4"
        v-for="menu in menuList"
        :key="menu.menuName"
        :bind="menu.iconName"
      >
        <q-card class="menu-card">
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
export default {
  name: "MenuCard",
  data() {
    console.log("menu card");
    return {
      menuList: [
        {
          iconName: "login",
          menuName: "Login",
        },
        {
          iconName: "schedule",
          menuName: "Scheduler",
        },
        {
          iconName: "logout",
          menuName: "Logout",
        },
        {
          iconName: "refresh",
          menuName: "refresh",
        },
        {
          iconName: "app_registration",
          menuName: "regis",
        },
        {
          iconName: "download_for_offline",
          menuName: "download",
        },
        {
          iconName: "create_new_folder",
          menuName: "new folder",
        },
        {
          iconName: "create_new_folder",
          menuName: "new folder",
        },
      ],
    };
  },
};
</script>

<style scoped>
.menu-container {
  column-gap: 0;
  column-count: 5;
}

.menu-card {
  /* max-height: 160px;
  max-width: 260px; */
}

.menu-card:hover {
  background-color: #f9f9f9;
  cursor: pointer;
}

.menu-icon {
  text-align: center;
  padding-top: 2vh;
}

.menu-detail {
  text-align: center;
  font-size: medium;
  font-weight: bold;
}
</style>
