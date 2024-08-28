<template>
  <q-toolbar class="q-pa-none">
    <div class="toolbar-left">
      <q-btn-group unelevated :style="{ gap: '8px' }">
        <q-btn flat icon="search" label="Search" :style="{
          'text-transform': 'none',
          'font-size': '16px',
          'border-radius': '12px',
          height: '20px',
          border: '1px solid #CED3D7',
          color: '#585858',
        }" />
        <q-btn @click="openFilterModal" icon="filter_list" label="Filter" :style="{
          'text-transform': 'none',
          'font-size': '16px',
          'border-radius': '12px',
          border: '1px solid #CED3D7',
          color: '#585858',
        }" />
        <q-btn ref="dateButton" @click="toggleDatePopup" flat icon="event" label="Date" :style="{
          'text-transform': 'none',
          'font-size': '16px',
          'border-radius': '12px',
          border: '1px solid #CED3D7',
          color: '#585858',
        }" />

         <!-- Date Popup -->
         <q-popup-proxy v-model="datePopup" ref="datePopup" :target="$refs.dateButton" transition-show="scale" transition-hide="scale">
          <q-card>
            <q-date v-model="selectedDate" />
            <q-card-actions align="right">
              <q-btn flat label="Cancel" color="negative" @click="toggleDatePopup" />
              <q-btn label="OK" color="primary" @click="confirmDate" />
            </q-card-actions>
          </q-card>
        </q-popup-proxy>

      </q-btn-group>
      <q-btn-group unelevated>
        <q-btn flat icon="remove" @click="zoomOut" :style="{
          'text-transform': 'none',
          'font-size': '16px',
          'border-radius': '12px',
          border: '1px solid #CED3D7',
          color: '#585858',
        }" />
        <q-btn flat label="100%" :style="{
          'text-transform': 'none',
          'font-size': '16px',
          color: '#585858',
        }" />
        <q-btn flat icon="add" @click="zoomIn" :style="{
          'text-transform': 'none',
          'font-size': '16px',
          'border-radius': '12px',
          border: '1px solid #CED3D7',
          color: '#585858',
        }" />
      </q-btn-group>
    </div>

    <q-space />

    <div class="status-indicators" :style="{
      'text-transform': 'none',
      'font-size': '16px',
      color: '#585858',
    }">
      <div v-for="status in statuses" :key="status.label" class="status-item">
        <q-badge :style="{
          backgroundColor: status.color,
          width: '16px',
          height: '16px',
        }"></q-badge>
        <span class="q-ml-sm">{{ status.label }}</span>
      </div>
    </div>
  </q-toolbar>
   <!-- Contoh elemen yang akan di-zoom -->
   <div :style="{ transform: `scale(${zoomLevel})` }">
    <!-- Konten Anda yang akan di-zoom -->
    <p>Ini adalah contoh konten yang akan di-zoom.</p>
  </div>



  <!-- Modal -->
  <q-dialog v-model="showModal" persistent>
    <q-card class="modalBar">
      <q-card-section>
        <div class="container-btn-title-modal">
          <div class="text-subtitle1 text-weight-bold q-pt-sm">Filter Schedule</div>
          <q-btn class="close-btn" dense flat icon="close" @click="showModal = false" />
        </div>
        <hr class="solid" />
        <div v-if="isFilterModal">
          <div class="example-row-equal-width">
            <div class="row">
              <div class="col q-mr-sm">
                <div class="form-group">
                  <div>From</div>
                  <q-input class="filter-all" filled v-model="filterData.from" type="date" />
                </div>
              </div>
              <div class="col">
                <div class="form-group">
                  <div>To</div>
                  <q-input class="filter-all" filled v-model="filterData.to" type="date" />
                </div>
              </div>
            </div>
          </div>
          <div class="form-group">
            <div>Area</div>
            <q-select class="filter-all" filled label="Select Area" :options="optionsAreas">
              <template v-slot:option="{ itemProps, opt, selected }">
                <q-item v-bind="itemProps">
                  <q-item-section>
                    <q-item-label>{{ opt.label }}</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-checkbox :model-value="selected" @update:model-value="filterData.area" />
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>
          <div class="form-group">
            <div>Line</div>
            <q-select class="filter-all" filled label="Select Line" :options="optionslines">
              <template v-slot:option="{ itemProps, opt, selected, toggleOption }">
                <q-item v-bind="itemProps">
                  <q-item-section>
                    <q-item-label>{{ opt.label }}</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-checkbox :model-value="selected" @update:model-value="toggleOption(opt)" />
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>
        </div>
        <q-card-actions class="q-mt-lg" align="right">
          <q-btn flat label="Reset" color="negative" @click="resetFilter" />
          <q-btn label="Show Results" color="primary" @click="showResults" />
        </q-card-actions>
      </q-card-section>
    </q-card>
  </q-dialog>


</template>



<script>
import { ref } from "vue";
import ListPage from "./ListPage.vue";
import { isCancel } from "axios";
import { QCard, QDate, QPopupProxy } from "quasar";

export default {
  name: "ListPage",
  components: {
    QCard,
    QDate,
    QPopupProxy,
  },
  name: "ZoomableComponent",
  setup() {
    const showModal = ref(false);

    const modalTitle = ref("");
    const isFilterModal = ref(true); // True jika modal untuk filter, false jika modal untuk details

    const filterData = ref({
      from: "",
      to: "",
    });

    const optionsAreas = [
      { label: "DIPPING PEGA DIP", value: "dipping pega dip" },
      { label: "DIPPING SANYO SE#01", value: "dipping sanyo se#01" },
      { label: "TESTING AS", value: "testing as" },
      { label: "TESTING NK", value: "testing nk" },
      { label: "TESTING SA_CB1", value: "testing sa_cb1" },
      { label: "TESTING SA_DL1", value: "testing sa_dl1" }
    ];

    const optionslines = [
      { label: "SMT-02G-LAB", value: "SMT-02G-LAB" },
      { label: "SMT-03G-LA", value: "SMT-03G-LA" },
      { label: "SMT-04G-LAB", value: "SMT-04G-LAB" },
      { label: "TESTING NK", value: "testing nk" },
      { label: "TESTING SA_CB1", value: "testing sa_cb1" },
      { label: "TESTING SA_DL1", value: "testing sa_dl1" }
    ];

    const selectedDate = ref(null);
    const datePopup = ref(false);

    const toggleDatePopup = () => {
      datePopup.value = !datePopup.value;
    };

    const confirmDate = () => {
      console.log("Selected date:", selectedDate.value);
      toggleDatePopup();
    };

    const eventsData = ref([
      // Data untuk q-table
    ]);

    const columns = ref([
      // Kolom untuk q-table
    ]);

    const openFilterModal = () => {
      modalTitle.value = "Filter";
      isFilterModal.value = true;
      showModal.value = true;
    };

    const openDetailsModal = () => {
      modalTitle.value = "Details";
      isFilterModal.value = false;
      showModal.value = true;
    };

    const closeModal = () => {
      showModal.value = false;
    };

    const resetFilter = () => {
      filterData.value = {
        from: "",
        to: "",
        area: null,
        line: null,
      };
    };

    const applyFilter = () => {
      console.log("Filter applied:", filterData.value);
      closeModal();
    };

    // Inisialisasi skala zoom
    const zoomLevel = ref(1);

    // Fungsi untuk memperbesar zoom
    const zoomIn = () => {
      if (zoomLevel.value < 2) { // Batas maksimum zoom
        zoomLevel.value += 0.1;
      }
    };

    // Fungsi untuk memperkecil zoom
    const zoomOut = () => {
      if (zoomLevel.value > 0.5) { // Batas minimum zoom
        zoomLevel.value -= 0.1;
      }
    };
    return {
      showModal,
      modalTitle,
      isFilterModal,
      filterData,
      eventsData,
      columns,
      openFilterModal,
      openDetailsModal,
      closeModal,
      resetFilter,
      applyFilter,
      optionsAreas,
      optionslines,
      zoomLevel,
      zoomIn,
      zoomOut,
      selectedDate,
      datePopup,
      toggleDatePopup,
      confirmDate,
    };

  },
  data() {
    return {
      statuses: ref([
        { label: "Preparation", color: "#e0e0e0" },
        { label: "Planning", color: "#42a5f5" },
        { label: "BOM", color: "#ffcccb" },
        { label: "Kitting", color: "#b2fab4" },
        { label: "Issue", color: "#f8bbd0" },
        { label: "Model Change", color: "#d1c4e9" },
        { label: "Production", color: "#ffb74d" },
        { label: "Complete", color: "#a5d6a7" },
      ]),
    }
  },
  methods: {
    viewItem(item) {
      this.$q.notify({
        message: `Clicked on ${item.name}`,
        color: 'primary',
        position: 'top'
      });
    },
    toggleReportDrawer() {
      this.$emit("on-toggle-click");
    },
    activateGantt() {
      this.isGanttActive = true;
      this.isListActive = false;
      this.isCalendarActive = false;
    },
    activateList() {
      this.isGanttActive = false;
      this.isListActive = true;
      this.isCalendarActive = false;
    },
    activateCalendar() {
      this.isGanttActive = false;
      this.isListActive = false;
      this.isCalendarActive = true;
    },
    openCalender() {
      this.calendarModal = true;
    }
  },
};
</script>

<style scoped>
.activeButton {
  border-bottom: 1px solid #cd202e;
  color: #cd202e;
}

.chipCircle {
  width: 5px;
  width: 5px;
}

.toolbar-left {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.status-indicators {
  display: flex;
  gap: 16px;
  align-items: center;
}

.status-item {
  display: flex;
  align-items: center;
}

.q-toolbar {
  flex-wrap: wrap;
}

.container-btn-title-modal {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.container-column {
  display: flex;
  justify-content: space-between;
}

hr.solid {
  border-top: 1px solid #d9d9d9;
}

.q-card-section {
  padding: 16px;
}

.filter-all {
  text-transform: none;
  font-size: 16px;
  border-radius: 12px;
  border: 1px solid #CED3D7;
  color: #585858;
}
</style>
