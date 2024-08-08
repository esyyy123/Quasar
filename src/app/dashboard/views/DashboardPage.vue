<template>
  <q-page class="q-px-md">
    <menu-card></menu-card>
  </q-page>
</template>

<script>
import MenuCard from "../components/MenuCard.vue";

export default {
  // name: "DashboardPage",
  components: {
    MenuCard,
  },
  data() {
    console.log("dashboard");
  },
  mounted() {
    console.log("aa");
  },
};
</script>
