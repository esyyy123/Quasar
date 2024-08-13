<template>
  <q-input rounded outlined v-model="text" label="Search" dense>
    <template v-slot:prepend>
      <q-icon name="search"></q-icon>
    </template>
  </q-input>
</template>

<script>
export default {
  name: "SearchBar",
};
</script>
