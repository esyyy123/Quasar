<template>
  <div class="col">
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
          <q-btn flat icon="filter_list" label="Filter" :style="{
            'text-transform': 'none',
            'font-size': '16px',
            'border-radius': '12px',
            border: '1px solid #CED3D7',
            color: '#585858',
          }" />
          <q-btn @click="openCalender" flat icon="event" label="Date" :style="{
            'text-transform': 'none',
            'font-size': '16px',
            'border-radius': '12px',
            border: '1px solid #CED3D7',
            color: '#585858',
          }" />

          <q-popup-proxy>

              <div id="q-popup-proxy" class="q-pa-md" style="min-height: 100vh;margin-left: 272px">
                <q-date v-model="date" today-btn />
              </div>
          </q-popup-proxy>

        </q-btn-group>
        <q-btn-group unelevated>
          <q-btn flat icon="remove" :style="{
            'text-transform': 'none',
            'font-size': '16px',
            'border-radius': '12px',
            border: '1px solid #CED3D7',
            color: '#585858',
          }" />
          <q-btn flat label="100 %" :style="{
            'text-transform': 'none',
            'font-size': '16px',
            color: '#585858',
          }" />
          <q-btn flat icon="add" :style="{
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
  </div>
</template>

<script>
import { ref } from "vue";
import ListPage from "./ListPage.vue";
import { isCancel } from "axios";

export default {
  components: {
  },
  data() {
    return {
      isGanttActive: true,
      isListActive: false,
      isCalendarActive: false,
      calendarModal: false,
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
    };
  },
  methods: {
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

.popup-date {
  top: 247.562px;
  left: 272px;
}
</style>
