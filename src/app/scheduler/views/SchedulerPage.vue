<template>
  <q-page padding>
    <div class="row flex flex-center q-mb-lg">
      <div class="col">
        <span class="text-h5 text-bold">Production Schedule</span>
      </div>
      <div class="col text-right">
        <span>Last Update, 18 July 2024, 14:00</span>
      </div>
    </div>
    <div class="row flex-center q-mb-md">
      <div class="col">
        <q-btn
          :class="{ activeButton: isGanttActive }"
          flat
          icon="account_tree"
          :color="isGanttActive ? 'red-14' : 'grey-7'"
          label="Gantt"
          @click="activateGantt"
        />
        <q-btn
          :class="{ activeButton: isListActive }"
          flat
          icon="list"
          :color="isListActive ? 'red-14' : 'grey-7'"
          label="List"
          @click="activateList"
        />
      </div>
      <div class="col text-right">
        <q-btn
          icon="event"
          class="q-mr-sm buttonScheduler"
          outline
          rounded
          color="grey-7"
          label="Outline Rounded"
        />
        <q-btn
          icon="fullscreen"
          class="q-mr-sm buttonScheduler"
          outline
          rounded
          color="grey-7"
          label="Outline Rounded"
        />
        <span>10 - 25 July 2024</span>
      </div>
    </div>
    <!-- content core -->
    <div v-if="isGanttActive" class="row flex-center q-mb-md">
      <div class="col-5">
        <q-btn
          icon="add"
          class="q-mr-sm buttonScheduler"
          unelevated
          color="red-14"
          label="Add Schedule"
        />
        <q-btn
          icon="tune"
          class="q-mr-sm buttonScheduler"
          outline
          rounded
          color="grey-7"
          label="Filter"
        />
        <q-btn
          icon="calendar_today"
          class="q-mr-sm buttonScheduler"
          outline
          rounded
          color="grey-7"
          label="Date"
        />
        <q-btn
          icon="remove"
          class="q-mr-sm buttonScheduler"
          outline
          rounded
          color="grey-7"
        />
        <span class="q-mr-sm">100 %</span>
        <q-btn
          icon="add"
          class="q-mr-sm buttonScheduler"
          outline
          rounded
          color="grey-7"
        />
      </div>
      <div class="col-7 text-right">
        <q-chip class="chipCircle" color="grey-4" /><span
          class="text-subtitle2 q-mr-sm"
          >Preparation</span
        >
        <q-chip class="chipCircle" color="blue-4" /><span
          class="text-subtitle2 q-mr-sm"
          >Planning</span
        >
        <q-chip class="chipCircle" color="pink-4" /><span
          class="text-subtitle2 q-mr-sm"
          >Bom</span
        >
        <q-chip class="chipCircle" color="cyan-4" /><span
          class="text-subtitle2 q-mr-sm"
          >Kitting</span
        >
        <q-chip class="chipCircle" color="pink-5" /><span
          class="text-subtitle2 q-mr-sm"
          >Issue</span
        >
        <q-chip class="chipCircle" color="purple-4" /><span
          class="text-subtitle2 q-mr-sm"
          >Model Change</span
        >
        <q-chip class="chipCircle" color="orange-4" /><span
          class="text-subtitle2 q-mr-sm"
          >Production</span
        >
        <q-chip class="chipCircle" color="green-4" /><span
          class="text-subtitle2 q-mr-sm"
          >Complete</span
        >
      </div>
    </div>
    <div v-else class="row flex-center q-mb-md">
      <div class="col">
        <!-- <q-input
          borderless
          dense
          debounce="500"
          placeholder="Search..."
          class="br-sm ll-outline"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input> -->
        <q-btn
          icon="tune"
          class="q-mr-sm buttonScheduler"
          outline
          rounded
          color="grey-7"
          label="Filter"
        />
      </div>
      <div class="col text-right">
        <q-btn
          icon="add"
          class="q-mr-sm buttonScheduler"
          unelevated
          color="red-14"
          label="Add Schedule"
        />
      </div>
    </div>
    <!-- content core end -->
    <FullCalendar :options="calendarOptions" />
  </q-page>
</template>

<style scoped>
.activeButton {
  border-bottom: 2px solid;
}
.buttonScheduler {
  border-radius: 10px;
}
.chipCircle {
  border-radius: 20%;
  width: 30px;
  height: 20px;
}
</style>

<script>
import FullCalendar from "@fullcalendar/vue3";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";

export default {
  components: {
    FullCalendar,
  },
  data() {
    return {
      isGanttActive: true,
      isListActive: false,
      calendarOptions: {
        plugins: [resourceTimelinePlugin],
        schedulerLicenseKey: "XXX",
      },
    };
  },
  mounted() {},
  methods: {
    activateGantt() {
      this.isGanttActive = true;
      this.isListActive = false;
    },
    activateList() {
      this.isGanttActive = false;
      this.isListActive = true;
    },
  },
};
</script>
