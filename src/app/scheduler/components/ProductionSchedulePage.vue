<template>
  <!-- <div class="row flex-center q-mb-md">
    <div class="col">
      <q-btn
        :class="{ activeButton: isGanttActive }"
        flat
        icon="account_tree"
        :color="isGanttActive ? 'red-14' : 'grey-7'"
        label="Gantt"
        @click="activateGantt"
        :style="{ 'text-transform': 'none', 'font-size': '16px' }"
      />
      <q-btn
        :class="{ activeButton: isListActive }"
        flat
        icon="list"
        :color="isListActive ? 'red-14' : 'grey-7'"
        label="List"
        @click="activateList"
        :style="{ 'text-transform': 'none', 'font-size': '16px' }"
      />
      <q-btn
        :class="{ activeButton: isCalendarActive }"
        flat
        icon="calendar_today"
        :color="isCalendarActive ? 'red-14' : 'grey-7'"
        label="Calendar"
        @click="activateCalendar"
        :style="{ 'text-transform': 'none', 'font-size': '16px' }"
      />
    </div>
    <div class="col text-right">
      <q-btn
        icon="event_note"
        class="q-mr-sm buttonScheduler"
        outline
        color="grey-7"
        label="Report"
        @click="toggleReportDrawer"
        :style="{
          'text-transform': 'none',
          'font-size': '16px',
          'border-radius': '12px',
        }"
      />
      <q-btn
        icon="fullscreen"
        class="q-mr-sm buttonScheduler"
        outline
        color="grey-7"
        label="Fullscreen"
        :style="{
          'text-transform': 'none',
          'font-size': '16px',
          'border-radius': '12px',
        }"
      />
      <span>10 - 25 July 2024</span>
    </div>
  </div> -->

  <div class="row">
    <div class="col">
      <q-toolbar class="q-pa-none">
        <!-- Bagian Kiri dengan Tabs -->
        <q-btn-group unelevated>
          <q-btn flat icon="view_timeline" label="Gantt" :style="{
            'text-transform': 'none',
            'font-size': '16px',
            color: !isGanttActive ? '#585858' : '',
          }" :class="{ activeButton: isGanttActive }" @click="activateGantt" />
          <q-btn flat icon="list" label="List" :style="{
            'text-transform': 'none',
            'font-size': '16px',
            color: !isListActive ? '#585858' : '',
          }" :class="{ activeButton: isListActive }" @click="activateList" />
          <q-btn flat icon="event" label="Calendar" :style="{
            'text-transform': 'none',
            'font-size': '16px',
            color: !isCalendarActive ? '#585858' : '',
          }" :class="{ activeButton: isCalendarActive }" @click="activateCalendar" />
        </q-btn-group>

        <q-space />

        <!-- Bagian Kanan dengan Tombol -->
        <q-btn-group unelevated :style="{ gap: '8px' }">
          <q-btn flat icon="assignment" label="Report" :style="{
            'text-transform': 'none',
            'font-size': '16px',
            'border-radius': '12px',
            border: '1px solid #CED3D7',
            color: '#585858',
          }" />
          <q-btn flat icon="fullscreen" label="Full Screen" :style="{
            'text-transform': 'none',
            'font-size': '16px',
            'border-radius': '12px',
            border: '1px solid #CED3D7',
            color: '#585858',
          }" />
        </q-btn-group>

        <div class="q-ml-sm" :style="{
          'text-transform': 'none',
          'font-size': '16px',
          color: '#585858',
        }">
          10 - 25 July 2024
        </div>
      </q-toolbar>
    </div>
  </div>

  <div v-if="isGanttActive" class="row">
    <div class="col">
      <q-toolbar class="q-pa-none">
        <div class="toolbar-left">
          <q-btn-group unelevated :style="{ gap: '8px' }">
            <q-btn flat icon="filter_list" label="Filter" :style="{
              'text-transform': 'none',
              'font-size': '16px',
              'border-radius': '12px',
              border: '1px solid #CED3D7',
              color: '#585858',
            }" />
            <q-btn flat icon="event" label="Date" :style="{
              'text-transform': 'none',
              'font-size': '16px',
              'border-radius': '12px',
              border: '1px solid #CED3D7',
              color: '#585858',
            }" />
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
  </div>

  <div v-if="isListActive" class="row">
    <div class="col">
      <q-toolbar class="q-pa-none">
        <div class="toolbar-left">
          <q-input dense rounded standout placeholder="Search..." prepend-icon="search" :style="{ width: '250px' }"
            class="q-mr-sm" />
          <q-btn-group unelevated :style="{ gap: '8px' }">
            <q-btn flat icon="filter_list" label="Filter" :style="{
              'text-transform': 'none',
              'font-size': '16px',
              'border-radius': '12px',
              border: '1px solid #CED3D7',
              color: '#585858',
            }" />
            <q-btn flat icon="event" label="Date" :style="{
              'text-transform': 'none',
              'font-size': '16px',
              'border-radius': '12px',
              border: '1px solid #CED3D7',
              color: '#585858',
            }" />
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
  </div>

  <div v-if="isCalendarActive" class="">
    <calendar-page />>
  </div>

  <!-- content core -->
  <!-- <div v-if="isGanttActive" class="row flex-center q-mb-sm">
    <div class="col-4">
      <q-btn
        icon="tune"
        class="q-mr-sm buttonScheduler"
        outline
        color="grey-7"
        label="Filter"
        :style="{
          'text-transform': 'none',
          'font-size': '16px',
          'border-radius': '12px',
        }"
      />
      <q-btn
        icon="calendar_today"
        class="q-mr-sm buttonScheduler"
        outline
        rounded
        color="grey-7"
        label="Date"
        :style="{
          'text-transform': 'none',
          'font-size': '16px',
          'border-radius': '12px',
        }"
      />
      <q-btn
        icon="remove"
        class="q-mr-sm buttonScheduler"
        outline
        rounded
        color="grey-7"
        :style="{
          'text-transform': 'none',
          'font-size': '16px',
          'border-radius': '12px',
        }"
      />
      <span class="q-mr-sm">100 %</span>
      <q-btn
        icon="add"
        class="q-mr-sm buttonScheduler"
        outline
        rounded
        color="grey-7"
        :style="{
          'text-transform': 'none',
          'font-size': '16px',
          'border-radius': '12px',
        }"
      />
    </div>
    <div class="col-8 text-right">
      <div style="display: flex; gap: 16px; align-items: center">
        <div style="display: flex; align-items: center">
          <q-badge
            style="width: 16px; height: 16px; background-color: #e0e0e0"
          ></q-badge>
          <span style="margin-left: 8px">Preparation</span>
        </div>
        <div style="display: flex; align-items: center">
          <q-badge
            style="width: 16px; height: 16px; background-color: #42a5f5"
          ></q-badge>
          <span style="margin-left: 8px">Planning</span>
        </div>
        <div style="display: flex; align-items: center">
          <q-badge
            style="width: 16px; height: 16px; background-color: #ffcccb"
          ></q-badge>
          <span style="margin-left: 8px">BOM</span>
        </div>
        <div style="display: flex; align-items: center">
          <q-badge
            style="width: 16px; height: 16px; background-color: #b2fab4"
          ></q-badge>
          <span style="margin-left: 8px">Kitting</span>
        </div>
        <div style="display: flex; align-items: center">
          <q-badge
            style="width: 16px; height: 16px; background-color: #f8bbd0"
          ></q-badge>
          <span style="margin-left: 8px">Issue</span>
        </div>
        <div style="display: flex; align-items: center">
          <q-badge
            style="width: 16px; height: 16px; background-color: #d1c4e9"
          ></q-badge>
          <span style="margin-left: 8px">Model Change</span>
        </div>
        <div style="display: flex; align-items: center">
          <q-badge
            style="width: 16px; height: 16px; background-color: #ffb74d"
          ></q-badge>
          <span style="margin-left: 8px">Production</span>
        </div>
      </div>
    </div>
  </div> -->
  <!-- <div v-if="isListActive" class="row flex-center q-mb-md">
    <div class="col">
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
    <div class="col text-right">
      <q-btn
        icon="add"
        class="q-mr-sm buttonScheduler"
        unelevated
        color="red-14"
        label="Add Schedule"
      />
    </div>
  </div> -->
  <!-- <div v-if="isCalendarActive" class="row flex-center q-mb-sm">
    <div class="col">
      <q-input
        rounded
        standout
        size="10px"
        bottom-slots
        v-model="text"
        label="Label"
        dense
      >
        <template v-slot:after>
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
            class="buttonScheduler"
            outline
            rounded
            color="grey-7"
          />
          <span class="text-h6">100 %</span>
          <q-btn
            icon="add"
            class="q-mr-sm buttonScheduler"
            outline
            rounded
            color="grey-7"
          />
        </template>
</q-input>
</div>
<div class="col text-right">
  <q-btn icon="add" class="q-mr-sm buttonScheduler" unelevated color="red-14" label="Add Schedula" />
</div>
</div> -->
  <!-- content core end -->
  <!-- <FullCalendar v-if="isGanttActive" :options="calendarOptions" /> -->

  <!-- table -->
  <!-- <div class="q-pa-sm overflow-x scroll">
    <q-markup-table separator="separator" bordered>
      <thead>
        <tr>
          <th style="width: 150px" class="text-center"></th>
          <th class="text-center" colspan="4">Wed, 17 Jul 2024</th>
          <th class="text-center" colspan="4">Thu, 18 Jul 2024</th>
          <th class="text-center" colspan="4">Fri, 19 Jul 2024</th>
          <th class="text-center" colspan="4">Sat, 20 Jul 2024</th>
          <th class="text-center" colspan="4">Sun, 21 Jul 2024</th>
          <th
            style="width: 200px; max-width: 200px"
            class="text-center"
            colspan="4"
          >
            Mon, 22 Jul 2024
          </th>
          <th
            style="width: 200px; max-width: 200px"
            class="text-center"
            colspan="4"
          >
            Tue, 23 Jul 2024
          </th>
          <th
            style="width: 200px; max-width: 200px"
            class="text-center"
            colspan="4"
          >
            Tue, 24 Jul 2024
          </th>
          <th
            style="width: 200px; max-width: 200px"
            class="text-center"
            colspan="4"
          >
            Tue, 24 Jul 2024
          </th>
          <th
            style="width: 200px; max-width: 200px"
            class="text-center"
            colspan="4"
          >
            Tue, 24 Jul 2024
          </th>
          <th
            style="width: 200px; max-width: 200px"
            class="text-center"
            colspan="4"
          >
            Tue, 24 Jul 2024
          </th>
        </tr>
        <tr>
          <th class="text-center"></th>
          <th style="width: 50px; max-width: 50px" class="text-center">6</th>
          <th style="width: 50px; max-width: 50px" class="text-center">12</th>
          <th style="width: 50px; max-width: 50px" class="text-center">18</th>
          <th style="width: 50px; max-width: 50px" class="text-center">24</th>
          <th class="text-center">6</th>
          <th class="text-center">12</th>
          <th class="text-center">18</th>
          <th class="text-center">24</th>
          <th class="text-center">6</th>
          <th class="text-center">12</th>
          <th class="text-center">18</th>
          <th class="text-center">24</th>
          <th class="text-center">6</th>
          <th class="text-center">12</th>
          <th class="text-center">18</th>
          <th class="text-center">24</th>
          <th class="text-center">6</th>
          <th class="text-center">12</th>
          <th class="text-center">18</th>
          <th class="text-center">24</th>
          <th class="text-center">6</th>
          <th class="text-center">12</th>
          <th class="text-center">18</th>
          <th class="text-center">24</th>
          <th class="text-center">6</th>
          <th class="text-center">12</th>
          <th class="text-center">18</th>
          <th class="text-center">24</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="text-center">
            <div class="q-ma-sm">
              <div>
                <span>AS-01 (MB)</span>
              </div>
              <q-avatar text-color="black" icon="lock_open" />
            </div>
          </td>
          <td colspan="4" class="text-center">
            <div>
              <q-badge color="blue">
                <div class="row">
                  <span>XM20240705-01</span>
                  <span>Factory 4 #2</span>
                  <div class="flex-break"></div>
                  <span>Completed</span>
                </div>
              </q-badge>
            </div>
          </td>
          <td colspan="4" class="text-center">DWADAWDAWDA</td>
          <td class="text-center"></td>
          <td class="text-center"></td>
          <td class="text-center"></td>
          <td class="text-center"></td>
          <td class="text-center"></td>
          <td class="text-center"></td>
          <td class="text-center"></td>
          <td class="text-center"></td>
          <td class="text-center"></td>
          <td class="text-center"></td>
          <td class="text-center"></td>
          <td class="text-center"></td>
          <td class="text-center"></td>
          <td class="text-center"></td>
          <td class="text-center"></td>
          <td class="text-center"></td>
          <td class="text-center"></td>
          <td class="text-center"></td>
          <td class="text-center"></td>
          <td class="text-center"></td>
        </tr>
        <tr>
          <td class="text-center">
            <div class="q-ma-sm">
              <div>
                <span>AS-02 (MB)</span>
              </div>
              <q-avatar text-color="black" icon="lock_open" />
            </div>
          </td>
          <td class="text-center"></td>
          <td class="text-center"></td>
          <td class="text-center"></td>
          <td class="text-center"></td>
          <td class="text-center"></td>
          <td class="text-center"></td>
          <td class="text-center"></td>
          <td class="text-center"></td>
          <td class="text-center"></td>
          <td class="text-center"></td>
          <td class="text-center"></td>
          <td class="text-center"></td>
          <td class="text-center"></td>
          <td class="text-center"></td>
          <td class="text-center"></td>
          <td class="text-center"></td>
          <td class="text-center"></td>
          <td class="text-center"></td>
          <td class="text-center"></td>
          <td class="text-center"></td>
          <td class="text-center"></td>
          <td class="text-center"></td>
          <td class="text-center"></td>
          <td class="text-center"></td>
          <td class="text-center"></td>
          <td class="text-center"></td>
          <td class="text-center"></td>
          <td class="text-center"></td>
        </tr>
        <tr>
          <td class="text-center">
            <div class="q-ma-sm">
              <div>
                <span>AS-03 (MB)</span>
              </div>
              <q-avatar text-color="black" icon="lock_open" />
            </div>
          </td>
          <td class="text-center"></td>
          <td class="text-center"></td>
          <td class="text-center"></td>
          <td class="text-center"></td>
          <td class="text-center"></td>
          <td class="text-center"></td>
          <td class="text-center"></td>
          <td class="text-center"></td>
          <td class="text-center"></td>
          <td class="text-center"></td>
          <td class="text-center"></td>
          <td class="text-center"></td>
          <td class="text-center"></td>
          <td class="text-center"></td>
          <td class="text-center"></td>
          <td class="text-center"></td>
          <td class="text-center"></td>
          <td class="text-center"></td>
          <td class="text-center"></td>
          <td class="text-center"></td>
          <td class="text-center"></td>
          <td class="text-center"></td>
          <td class="text-center"></td>
          <td class="text-center"></td>
          <td class="text-center"></td>
          <td class="text-center"></td>
          <td class="text-center"></td>
          <td class="text-center"></td>
        </tr>
      </tbody>
    </q-markup-table>
  </div> -->
</template>

<script>
import { ref } from "vue";

import CalendarPage from "./CalendarPage.vue"
import { isCancel } from "axios";

export default {
  components: {
    CalendarPage,
  },
  data() {
    return {
      isGanttActive: true,
      isListActive: false,
      isCalendarActive: false,
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
  },
};
</script>

<style scoped>
.calender {}

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
</style>
