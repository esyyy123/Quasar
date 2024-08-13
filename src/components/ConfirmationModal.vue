<template>
  <q-card class="q-pa-md">
    <q-card-section class="q-pa-md flex flex-center">
      <q-icon name="help" size="xl" class="menu-icon"></q-icon>
    </q-card-section>

    <q-card-section class="q-pt-none">
      {{ confirmMessage }}
    </q-card-section>

    <q-card-actions align="center">
      <q-btn flat label="NO" color="negative" v-close-popup />
      <q-btn unelevated label="YES" color="negative" v-close-popup />
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  name: "ConfirmationModal",
  props: ["confirmMessage"],
  mounted() {
    console.log("modal");
    console.log(this.confirmMessage);
  },
};
</script>

<style scoped>
.menu-icon {
  text-align: center;
  /* padding-top: 2vh; */
  color: #fd841f;
}
</style>
