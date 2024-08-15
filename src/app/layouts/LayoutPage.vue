<template>
  <q-layout view="lHr lpR fFf">
    <header-component></header-component>

    <q-page-container>
      <!-- bread crumbs to be add v-if -->
      <!-- <div class="col q-py-sm q-px-md bread-crumbs" style="align-items: center">
        <bread-crumbs></bread-crumbs>
      </div> -->
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
import BreadCrumbs from "src/components/BreadCrumbs.vue";
import HeaderComponent from "src/components/HeaderComponent.vue";

export default {
  components: {
    HeaderComponent,
    // BreadCrumbs,
  },
  mounted() {
    console.log("Layout Page Loaded");
    // console.log(isLoggedIn);
  },
  methods: {},
};
</script>

<style scoped>
.bread-crumbs {
  background-color: transparent;
  color: black;
}
</style>
