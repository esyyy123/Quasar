<template>
  <q-layout class="hHh lpR fFf">
    <header-component></header-component>
    <q-page-container>
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
import HeaderComponent from "src/components/HeaderComponent.vue";

export default {
  components: {
    HeaderComponent,
  },
  mounted() {
    console.log("Layout Page Loaded");
  },
};
</script>
