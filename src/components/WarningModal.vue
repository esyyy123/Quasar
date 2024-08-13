<template>
  <q-card class="q-pa-md">
    <q-card-section class="q-pa-md flex flex-center">
      <q-icon name="warning" size="xl" class="menu-icon"></q-icon>
    </q-card-section>

    <q-card-section class="q-pt-none">
      {{ warningMessage }}
    </q-card-section>

    <q-card-actions align="center">
      <q-btn unelevated label="OK" color="negative" v-close-popup />
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  name: "WarningModal",
  props: ["warningMessage"],
  mounted() {
    console.log("modal");
    console.log(this.warningMessage);
  },
};
</script>

<style scoped>
.menu-icon {
  text-align: center;
  /* padding-top: 2vh; */
  color: #ffc800;
}
</style>
