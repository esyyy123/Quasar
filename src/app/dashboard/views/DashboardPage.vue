<template>
  <q-page>
    <div class="row q-pa-md flex flex-center">
      <!-- <div class="col col-sm-12 col-md-8 col-xl-4">
        <search-bar></search-bar>
      </div> -->
    </div>
    <div class="row flex flex-center q-pa-md">
      <div
        class="col col-sm-12 col-md-8 col-xl-4 menu-card-position flex flex-center"
      >
        <menu-card></menu-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import SearchBar from "src/components/SearchBar.vue";
import MenuCard from "../components/MenuCard.vue";

export default {
  name: "DashboardPage",
  components: {
    MenuCard,
    // SearchBar,
  },
  data() {
    console.log("dashboard");
  },
  mounted() {
    console.log("aa");
  },
};
</script>

<style scoped>
.menu-card-position {
  height: 600px;
  max-height: 600px;
  overflow-y: auto;
}
</style>
