<template>
  <q-page padding>
    <BryntumScheduler :height="schedulerHeight" v-bind="config" />
  </q-page>
</template>

<script>
import { BryntumScheduler } from "@bryntum/scheduler-vue-3";
import { reactive } from "vue";

export default {
  components: {
    BryntumScheduler,
  },
  data() {
    return {
      config: reactive({
        startDate: new Date(2024, 0, 1, 6),
        endDate: new Date(2024, 0, 1, 20),
        viewPreset: "hourAndDay",
        rowHeight: 50,
        columns: [
          { text: "Name", field: "name", width: 130 },
          { text: "Age", field: "age", width: 130 },
        ],
        events: [
          {
            id: 1,
            resourceId: 6,
            startDate: new Date(2024, 0, 1, 6),
            endDate: new Date(2024, 0, 1, 8),
            name: "Sport event",
            iconCls: "b-fa b-fa-basketball-ball",
          },
        ],
        resources: [
          { id: 1, name: "Mike", age: 25, meta: { job: "Developer" } },
          { id: 2, name: "Linda", age: 26, meta: { job: "Developer" } },
          { id: 3, name: "Don", age: 34, meta: { job: "Designer" } },
          { id: 4, name: "Karen", age: 22, meta: { job: "Developer" } },
          { id: 5, name: "Doug", age: 29, meta: { job: "Developer" } },
          { id: 6, name: "Peter", age: 25, meta: { job: "Developer" } },
          { id: 7, name: "San", age: 52, meta: { job: "Project Manager" } },
          { id: 8, name: "Melissa", age: 29, meta: { job: "Developer" } },
          { id: 9, name: "John", age: 21, meta: { job: "Designer" } },
          { id: 10, name: "Ellen", age: 32, meta: { job: "Developer" } },
        ],
      }),
    };
  },
  computed: {
    schedulerHeight() {
      const rows = this.config.resources.length;
      const rowHeight = this.config.rowHeight + 2 || 100;
      const padding = 50;
      return rows * rowHeight + padding;
    },
  },
};
</script>
