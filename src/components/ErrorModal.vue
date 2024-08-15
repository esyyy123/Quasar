<template>
  <q-card class="q-pa-md">
    <q-card-section class="q-pa-md flex flex-center">
      <q-icon name="error" size="xl" class="menu-icon"></q-icon>
    </q-card-section>

    <q-card-section class="q-pt-none">
      {{ errorMessage }}
    </q-card-section>

    <q-card-actions align="center">
      <q-btn unelevated label="OK" color="negative" v-close-popup />
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  name: "ErrorModal",
  props: ["errorMessage"],
  mounted() {
    console.log("modal");
    console.log(this.errorMessage);
  },
};
</script>

<style scoped>
.menu-icon {
  text-align: center;
  /* padding-top: 2vh; */
  color: #c10015;
}
</style>
