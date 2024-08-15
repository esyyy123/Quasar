<template>
  <q-input
    rounded
    outlined
    v-model="text"
    label="Search"
    class="q-mr-sm rounded-button"
    dense
  >
    <template v-slot:prepend>
      <q-icon name="search"></q-icon>
    </template>
  </q-input>
</template>

<script>
export default {
  name: "SearchBar",
  props: ["placeholder"],
};
</script>

<style scoped>
.rounded-button {
  border-radius: 10px !important;
}
</style>
