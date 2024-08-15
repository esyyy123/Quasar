<template>
  <div class="q-pa-sm q-gutter-sm">
    <q-breadcrumbs active-color="black" style="font-size: 12px">
      <q-breadcrumbs-el icon="home" to="/" />
      <q-breadcrumbs-el
        label="Docs"
        icon="widgets"
        to="/start/pick-quasar-flavour"
      />
      <q-breadcrumbs-el
        label="Breadcrumbs"
        icon="navigation"
        to="/vue-components/breadcrumbs"
      />
      <q-breadcrumbs-el label="Build" icon="build" />
    </q-breadcrumbs>
  </div>
</template>

<script>
export default {
  name: "BreadCrumbs",
};
</script>
