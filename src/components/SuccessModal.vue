<template>
  <q-card class="q-pa-md">
    <q-card-section class="q-pa-md flex flex-center">
      <q-icon name="check_circle" size="xl" class="menu-icon"></q-icon>
    </q-card-section>

    <q-card-section class="q-pt-none">
      {{ successMessage }}
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: "SuccessModal",
  props: ["successMessage"],
  mounted() {
    console.log("modal");
    console.log(this.successMessage);
  },
};
</script>

<style scoped>
.menu-icon {
  text-align: center;
  /* padding-top: 2vh; */
  color: #71d28f;
}
</style>
