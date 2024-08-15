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
          icon="event_note"
          class="q-mr-sm buttonScheduler"
          outline
          rounded
          color="grey-7"
          label="Report"
          @click="toggleReportDrawer"
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
  </q-page>

  <!-- drawer -->
  <q-drawer
    v-model="reportDrawerOpen"
    side="left"
    elevated
    overlay
    class="q-pa-md"
  >
    <q-scroll-area class="fit">
      <!-- drawer content -->
      <div class="row flex q-mb-sm">
        <div class="col col-md-10">
          <span class="text-h5">Report List</span>
        </div>
        <div class="col col-md-2 self-center" style="text-align: end">
          <q-icon
            name="close"
            size="xs"
            color="grey"
            @click="toggleReportDrawer"
          ></q-icon>
        </div>
      </div>
      <q-separator />
      <div class="q-py-sm">
        <search-bar :placeholder="WorkOrder / Model / Process"></search-bar>
      </div>
      <q-list>
        <template v-for="(menuItem, index) in menuList" :key="index">
          <q-item
            clickable
            :active="menuItem.label === 'Outbox'"
            v-ripple
            @click="moveTo(menuItem.route)"
          >
            <q-item-section avatar class="col col-md-2">
              <q-icon :name="menuItem.icon" />
            </q-item-section>
            <q-item-section class="col col-md-8">
              {{ menuItem.label }}
            </q-item-section>
            <q-item-section class="col col-md-2" style="align-items: end">
              <q-icon name="chevron_right"></q-icon>
            </q-item-section>
          </q-item>
          <q-separator :key="'sep' + index" v-if="menuItem.separator" />
        </template>
      </q-list>
    </q-scroll-area>
  </q-drawer>
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
import { ref } from "vue";
import SearchBar from "src/components/SearchBar.vue";

export default {
  components: {
    SearchBar,
  },
  setup() {
    const menuList = [
      {
        icon: "assignment",
        label: "Report Daily Production",
        sublabel: "Report Daily Production",
        route: "reports/daily-production-confirmation",
        separator: false,
      },
      {
        icon: "description",
        label: "Schedule Summary",
        sublabel: "Schedule Summary",
        route: "reports/schedule-summary",
        separator: true,
      },
      {
        icon: "inbox",
        label: "Inbox",
        separator: true,
      },
      {
        icon: "send",
        label: "Outbox",
        separator: false,
      },
      {
        icon: "delete",
        label: "Trash",
        separator: false,
      },
      {
        icon: "error",
        label: "Spam",
        separator: true,
      },
      {
        icon: "settings",
        label: "Settings",
        separator: false,
      },
      {
        icon: "feedback",
        label: "Send Feedback",
        separator: false,
      },
      {
        icon: "help",
        iconColor: "primary",
        label: "Help",
        separator: false,
      },
    ];

    const reportDrawerOpen = ref(false);

    return {
      menuList,
      reportDrawerOpen,
      toggleReportDrawer() {
        reportDrawerOpen.value = !reportDrawerOpen.value;
      },
    };
  },
  data() {
    return {
      isGanttActive: true,
      isListActive: false,

    };
  },
  methods: {
    activateGantt() {
      this.isGanttActive = true;
      this.isListActive = false;
    },
    activateList() {
      this.isGanttActive = false;
      this.isListActive = true;
    },
    moveTo(route) {
      console.log(route);
      this.$router.push(`/app/scheduler/${route}`);
    },
  },
};
</script>
