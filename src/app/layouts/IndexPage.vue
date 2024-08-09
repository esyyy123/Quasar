<template>
  <LayoutPage @move="movePage"> </LayoutPage>
</template>

<script>
import LayoutPage from "./LayoutPage.vue";
export default {
  data() {
    return {
      currentRoute: "dashboard",
    };
  },
  components: {
    LayoutPage,
  },
  methods: {
    movePage(newPageName) {
      console.log(newPageName);
      this.currentRoute = newPageName;
    },
  },
  mounted() {
    console.log("Index Page Loaded");
  },
};
</script>
