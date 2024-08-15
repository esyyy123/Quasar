<template>
  <q-responsive :ratio="5 / 1.56" class="col">
    {{ console.log("calls table") }}
    <q-table
      :rows="datas"
      :column="columns"
      row-key="id"
      flat
      bordered
      :rows-per-page-options="[10]"
      no-data-label="Data not found."
      no-results-label="Filtered data returns 0 rows."
    >
    </q-table>
  </q-responsive>
</template>

<script>
import { ref } from "vue";

export default {
  name: "DataTable",
  props: {
    rowData: {
      type: Object,
      default: null,
    },
    // columns: {
    //   type: Object,
    //   default: null,
    // },
  },
  data() {
    return {
      datas: ref([]),
      columns: ref([]),
    };
  },
  methods: {
    generateColumns(data) {
      console.log("overall", Object.values(data));

      // const colName = [
      //   data.map((a, i) => {
      //     console.log("a", a);
      //     console.log("key", Object.keys(a));
      //   }),
      // ];
      const colName = [];
      // set as array
      data.map((obj, i) => {
        colName = Object.keys(obj);
      }),
        console.log("col name", colName);

      // // for JSON only
      // data.map((key) => {
      //   console.log("key", typeof key);
      //   console.log("keys", Object.values(key));
      //   Object.values(key).map((innerObj) => {
      //     console.log("inner obj", typeof innerObj);
      //     if (typeof innerObj === "object") {
      //       Object.keys(innerObj).map((innerKey) => {
      //         console.log("innerKey", innerKey);
      //         dataColumns.add(innerKey);
      //       });
      //     }
      //   });
      // });

      // console.log("inner column", dataColumns);
      return colName;
    },
    generateId(data) {
      var rows = [];

      rows = data.map((val, index) => {
        return {
          id: index + 1,
          ...val,
        };
      });

      return rows;
    },
  },
  mounted() {
    console.log(this.rowData);
    this.datas = this.generateId(this.rowData);
    // this.columns = this.generateColumns(this.rowData);
  },
  watch: {
    rowData() {
      console.log("watch", this.rowData);
    },
  },
};
</script>
