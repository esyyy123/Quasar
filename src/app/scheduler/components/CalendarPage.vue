<template>
  <q-page class="q-pa-md">
    <div class="calendar-container">
      <div class="calendar-controls">
        <q-btn-group unelevated>
          <q-btn flat round icon="chevron_left" @click="prev" />
          <div class="fc-toolbar-title">{{ calendarTitle }}</div>
          <q-btn flat round icon="chevron_right" @click="next" />
          <q-btn-dropdown
            :label="selectedView"
            dropdown-icon="expand_more"
            style="
              text-transform: none;
              font-size: 16px;
              border-radius: 12px;
              border: 1px solid rgb(206, 211, 215);
              color: rgb(88, 88, 88);
            "
          >
            <q-list>
              <q-item
                clickable
                v-close-popup
                @click="changeView('dayGridMonth')"
              >
                <q-item-section>
                  <q-item-label>Monthly</q-item-label>
                </q-item-section>
              </q-item>
              <q-item
                clickable
                v-close-popup
                @click="changeView('dayGridWeek')"
              >
                <q-item-section>
                  <q-item-label>Weekly</q-item-label>
                </q-item-section>
              </q-item>
              <q-item
                clickable
                v-close-popup
                @click="changeView('timeGridWeek')"
              >
                <q-item-section>
                  <q-item-label>Year</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </q-btn-group>
      </div>
    </div>
    <FullCalendar ref="fullCalendarRef" :options="calendarOptions" />

    <!-- Modal -->
    <q-dialog v-model="showModal" persistent>
      <q-card>
        <q-card-section>
          <q-table
            :rows="[selectedEvent.value]"
            :columns="columns"
            row-key="id"
            flat
          />
        </q-card-section>
        <q-card-actions>
          <q-btn flat label="Close" @click="showModal = false" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import multiMonthPlugin from "@fullcalendar/multimonth";
import { QDialog, QCard, QCardSection, QBtn, QTable } from "quasar";

export default defineComponent({
  name: "CalendarPage",
  components: {
    FullCalendar,
    QDialog,
    QCard,
    QCardSection,
    QBtn,
    QTable,
  },
  setup() {
    const fullCalendarRef = ref(null);
    const selectedView = ref("Monthly");
    const calendarTitle = ref("");
    const showModal = ref(false);
    const selectedEvent = ref(null);

    const calendarOptions = ref({
      plugins: [
        dayGridPlugin,
        timeGridPlugin,
        interactionPlugin,
        multiMonthPlugin,
      ],
      initialView: "dayGridMonth",
      weekends: true,
      editable: true,
      droppable: true,
      headerToolbar: false,
      views: {
        dayGridMonth: {
          dayHeaderContent: (args) => {
            const dayNames = {
              Sun: "Sunday",
              Mon: "Monday",
              Tue: "Tuesday",
              Wed: "Wednesday",
              Thu: "Thursday",
              Fri: "Friday",
              Sat: "Saturday",
            };
            return dayNames[args.text];
          },
        },
        timeGridWeek: {
          titleFormat: { year: "numeric" },
        },
        dayGridWeek: {
          dayHeaderFormat: { weekday: "long" },
        },
      },
      events: [
        {
          id: "event1",
          title: "Event 1- 5h",
          start: "2024-08-16",
          displayEventTime: false,
          editable: true,
          allDay: true,
        },
        {
          id: "event2",
          title: "Event 2- 5h",
          start: "2024-08-17",
          displayEventTime: false,
          color: "#a2deb1",
          editable: true,
          allDay: true,
        },
        {
          id: "event3",
          title: "Event 3- 5h",
          start: "2024-08-18",
          displayEventTime: false,
          color: "#fdce62",
          editable: true,
          allDay: true,
        },
      ],
      eventClick: (info) => {
        selectedEvent.value = info.event;
        showModal.value = true;
      },
      datesSet: (info) => {
        const view = info.view;
        if (view.type === "timeGridWeek") {
          calendarTitle.value = new Date(view.currentStart).getFullYear();
        } else {
          calendarTitle.value = view.title;
        }
      },
    });

    const updateTitle = (view) => {
      if (view.type === "timeGridWeek") {
        calendarTitle.value = new Date(view.currentStart).getFullYear();
      } else {
        calendarTitle.value = view.title;
      }
    };

    const prev = () => {
      const calendarApi = fullCalendarRef.value?.getApi();
      if (calendarApi) {
        calendarApi.prev();
      }
    };

    const next = () => {
      const calendarApi = fullCalendarRef.value?.getApi();
      if (calendarApi) {
        calendarApi.next();
      }
    };

    const changeView = (viewName) => {
      if (fullCalendarRef.value) {
        const calendarApi = fullCalendarRef.value.getApi();
        if (calendarApi) {
          calendarApi.changeView(viewName);
          selectedView.value =
            viewName === "dayGridMonth"
              ? "Monthly"
              : viewName === "dayGridWeek"
              ? "Weekly"
              : viewName === "timeGridWeek"
              ? "Year"
              : ""; // Default empty string or another view name if needed
          updateTitle(calendarApi.view);
        }
      }
    };

    onMounted(() => {
      if (fullCalendarRef.value) {
        const calendarApi = fullCalendarRef.value.getApi();
        console.log("FullCalendar API initialized:", calendarApi);
        updateTitle(calendarApi.view);
      }
    });

    const columns = [
      { name: "id", label: "ID", align: "left", field: "id" },
      { name: "title", label: "Title", align: "left", field: "title" },
      { name: "start", label: "Start Date", align: "left", field: "start" },
      { name: "end", label: "End Date", align: "left", field: "end" },
    ];

    return {
      calendarOptions,
      changeView,
      fullCalendarRef,
      prev,
      next,
      selectedView,
      calendarTitle,
      showModal,
      selectedEvent,
    };
  },
});
</script>

<style>
:root {
  --fc-button-hover-bg-color: #fff;
  --fc-button-active-bg-color: #ffff;
}
.fc-toolbar-chunk {
  display: flex;
  justify-content: flex-start; /* Align toolbar to the left */
  align-items: center;
}
/* Style untuk menempatkan dropdown tepat di sebelah tombol next */
/* Ensure the toolbar is using flexbox */
.fc-toolbar {
  display: flex;
  align-items: center; /* Align items vertically */
  justify-content: flex-start; /* Align items horizontally to the left */
}

/* Remove default margins and paddings from buttons */
.fc-prev-button,
.fc-next-button {
  margin: 0;
  padding: 0;
}

.fc .fc-button-primary {
  background-color: #fff;
  border-color: #ffff;
  color: #b0b0b0;
}

.fc-scrollgrid-section
  .fc-scrollgrid-section-body
  .fc-scrollgrid-section-liquid {
  height: 100px;
}

/* title  */
.fc-toolbar-title {
  font-size: 16px;
  font-weight: bold;
  margin-top: 10px;
}

/* Style for draggable items */
.draggable-item {
  width: 200px;
  height: 100px;
  color: black;
  text-align: center;
  line-height: 80px;
  cursor: move;
  border-radius: 10px;
  margin: 10px 0;
  font-weight: bold;
}

.custom-dropbar {
  position: absolute;
  top: 50px; /* Sesuaikan posisi dengan kebutuhan */
  left: 0; /* Sesuaikan posisi dengan kebutuhan */
  z-index: 3; /* Pastikan berada di bawah angka tanggal */
  background-color: #fff; /* Tambahkan latar belakang jika diperlukan */
  border: 1px solid #ccc; /* Tambahkan border jika diperlukan */
}

/* Specific styles for CKD and NON CKD items */
.green-item {
  background-color: #a2deb1; /* Green background */
}

.yellow-item {
  background-color: #fdce62; /* Yellow background */
}

.fc-daygrid-day {
  height: 60px; /* Sesuaikan dengan tinggi yang diinginkan */
}
/* Atur tinggi header untuk hari Sabtu dan Minggu */
.fc-col-header-cell.fc-day-sun,
.fc-col-header-cell.fc-day-sat {
  background-color: #f9ebec; /* Background color */
  color: red; /* Text color */
  text-align: left; /* Align text to the left */
  padding-left: 10px; /* Padding for alignment */
  height: 50px; /* Set height */
  line-height: 50px; /* Align text vertically */
}

/* CSS tambahan untuk responsivitas */
@media (max-width: 600px) {
  .fc-col-header-cell.fc-day-sun,
  .fc-col-header-cell.fc-day-sat {
    background-color: #ffebee; /* Lighter background color for small screens */
    height: 40px; /* Adjust height for small screens if needed */
    line-height: 40px; /* Adjust line-height for vertical alignment */
  }
}

@media (min-width: 601px) and (max-width: 1024px) {
  .fc-col-header-cell.fc-day-sun,
  .fc-col-header-cell.fc-day-sat {
    background-color: #f9ebec; /* Medium background color for tablets */
    height: 50px; /* Ensure height is consistent */
    line-height: 50px; /* Ensure text alignment */
  }
}

@media (min-width: 1025px) {
  .fc-col-header-cell.fc-day-sun,
  .fc-col-header-cell.fc-day-sat {
    background-color: #fce4ec; /* Default background color for large screens */
    height: 50px; /* Consistent height for large screens */
    line-height: 50px; /* Ensure vertical alignment */
  }
}

.fc-col-header-cell.fc-day-mon,
.fc-col-header-cell.fc-day-tue,
.fc-col-header-cell.fc-day-wed,
.fc-col-header-cell.fc-day-thu,
.fc-col-header-cell.fc-day-fri {
  text-align: left;
  padding-left: 10px;
}

.fc-daygrid-day-top {
  display: flex;
  justify-content: flex-start; /* Atur teks ke sebelah kiri */
  padding-left: 10px; /* Tambahkan padding kiri */
}

/* Menghilangkan border, outline, dan shadow pada tombol prev dan next di semua keadaan */
.fc-prev-button,
.fc-next-button {
  border: none !important; /* Menghilangkan border default */
  outline: none !important; /* Menghilangkan outline default */
  box-shadow: none !important; /* Menghilangkan shadow default */
}

.fc-prev-button:hover .fc-icon,
.fc-next-button:hover .fc-icon {
  color: #909090 !important; /* Ganti dengan warna yang diinginkan, misalnya abu-abu */
}

.fc-prev-button:hover,
.fc-next-button:hover {
  background-color: white;
}
.fc-prev-button:hover,
.fc-next-button:hover,
.fc-prev-button:focus,
.fc-next-button:focus,
.fc-prev-button:active,
.fc-next-button:active,
.fc-prev-button:focus-visible,
.fc-next-button:focus-visible {
  border: none !important; /* Menghilangkan border saat hover, fokus, dan aktif */
  outline: none !important; /* Menghilangkan outline saat hover, fokus, dan aktif */
  box-shadow: none !important; /* Menghilangkan shadow saat hover, fokus, dan aktif */
}

.fc .fc-button-primary.fc-prev-button,
.fc .fc-button-primary.fc-next-button {
  border: none !important;
  outline: none !important;
  box-shadow: none !important;
}

.fc-col-header-cell {
  text-align: left;
  height: 50px;
  line-height: 50px;
}

#mycalendar {
  margin-top: 20px;
}
</style>
