  <script>
  import { defineComponent, ref, onMounted } from "vue";
  import FullCalendar from "@fullcalendar/vue3";
  import dayGridPlugin from "@fullcalendar/daygrid";
  import timeGridPlugin from "@fullcalendar/timegrid";
  import interactionPlugin from "@fullcalendar/interaction";
  import multiMonthPlugin from "@fullcalendar/multimonth";
  // import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
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
      const selectedBrand = ref("all customer")
      const eventsData = ref()
      const columns = [
        { name: "id", label: "No", align: "left", field: "id" },
        { name: "customer", label: "Customer", align: "left", field: "customer" },
        { name: "brand", label: "CKD", align: "left", field: "start" },
        { name: "start", label: "Non CKD", align: "left", field: "start" },
      ];

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
            dayHeaderFormat: { weekday: "long" },
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
            id: "1",
            title: "Event 1- 5h",
            customer: "oppo",
            start: "2024-08-16",
            end: "2024-08-18",
            displayEventTime: true,
            editable: true,
            allDay: true,
          },
          {
            id: "2",
            title: "Event 2- 5h",
            customer: "xiaomi",
            start: "2024-08-17",
            end: "2024-08-23",
            displayEventTime: false,
            color: "#a2deb1",
            editable: true,
            allDay: true,
          },
          {
            id: "3",
            title: "Event 3- 5h",
            customer: "asus",
            start: "2024-08-18",
            end: "2024-08-21",
            displayEventTime: false,
            color: "#fdce62",
            editable: true,
            allDay: true,
          },
        ],
        eventClick: (info) => {
          selectedEvent.value = info.event ? { id: info.event.id, title: info.event.customer, start: info.event.start, brand: info.event.title, end: info.event.end } : null;
          showModal.value = true;
        },
        datesSet: (info) => {
          const view = info.view;
          if (view.type === "timeGridWeek") {
            calendarTitle.value = new Date(view.currentStart).getFullYear();
          } else {
            calendarTitle.value = view.title;
          }
          loadEventsIntoTable();
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
                    : "";
            updateTitle(calendarApi.view);
            loadEventsIntoTable();
          }
        }
      };

      const loadEventsIntoTable = () => {
        const calendarApi = fullCalendarRef.value?.getApi();
        if (calendarApi) {
          const events = calendarApi.getEvents();
          eventsData.value = events.map((event) => ({
            id: event.id,
            customer: event.customer,
            start: event.start,
            end: event.end,
          }));
        }
      };

      onMounted(() => {
        if (fullCalendarRef.value) {
          const calendarApi = fullCalendarRef.value.getApi();
          console.log("FullCalendar API initialized:", calendarApi);
          updateTitle(calendarApi.view);
          loadEventsIntoTable();
        }
      });


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
        columns,
        selectedBrand,
        eventsData,
      };
    },
  });
</script>

  <template>
    <q-page class="q-pa-md">
      <div class="calendar-container">
        <div class="calendar-controls">
          <q-btn-group unelevated>
            <q-btn flat round icon="chevron_left" @click="prev" />
            <div class="fc-toolbar-title">{{ calendarTitle }}</div>
            <q-btn flat round icon="chevron_right" @click="next" />
            <q-btn-dropdown :label="selectedView" dropdown-icon="expand_more" style="
                text-transform: none;
                font-size: 16px;
                border-radius: 12px;
                border: 1px solid rgb(206, 211, 215);
                color: rgb(88, 88, 88);
              ">
              <q-list>
                <q-item clickable v-close-popup @click="changeView('dayGridMonth')">
                  <q-item-section>
                    <q-item-label>Monthly</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item clickable v-close-popup @click="changeView('dayGridWeek')">
                  <q-item-section>
                    <q-item-label>Weekly</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item clickable v-close-popup @click="changeView('timeGridWeek')">
                  <q-item-section>
                    <q-item-label>Year</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
            <q-btn-dropdown :label="selectedBrand" dropdown-icon="expand_more" style="
                text-transform: none;
                font-size: 16px;
                border-radius: 12px;
                border: 1px solid rgb(206, 211, 215);
                color: rgb(88, 88, 88);
              ">
              <q-list>
                <q-select filled v-model="multipleCustomer" multiple :options="options" label="select customer" style="
                text-transform: none;
                font-size: 16px;
                border-radius: 12px;
                border: 1px solid rgb(206, 211, 215);
                color: rgb(88, 88, 88);
                width: 300px;
              " />
              </q-list>
            </q-btn-dropdown>
          </q-btn-group>
        </div>
      </div>
      <FullCalendar ref="fullCalendarRef" :options="calendarOptions" />
      <!-- Modal -->
      <q-dialog v-model="showModal" persistent>
        <q-card class="custom-table-size">
          <q-card-section>
            <div class="container-btn-title-modal">
              <div class="text-subtitle1 text-weight-bold q-pt-sm">Details</div>
              <q-btn class="close-btn" dense flat icon="close" @click="showModal = false" />
            </div>
            <hr class="solid">
            <div class="container-column">
              <div class="status1">
                <div class="text-weight-regular text-caption">CKD</div>
                <div class="text-weight-bold text-h6">300</div>
              </div>
              <div class="q-ml-xl">
                <div class="text-weight-regular text-caption ">NON CKD</div>
                <div class="text-weight-bold text-h6">450</div>
              </div>
            </div>
            <q-table class="custom-thead-bg" style="font-family: roboto; font-weight: bold;" :rows="eventsData"
              :columns="columns" row-key="id" flat />
          </q-card-section>
        </q-card>
      </q-dialog>
    </q-page>
  </template>


<style>
:root {
  --fc-button-hover-bg-color: #fff;
  --fc-button-active-bg-color: #ffff;
}

.container-btn-title-modal {
  display: flex;
  justify-content: space-between;
}

.custom-table-size {
  max-width: 800px;
  /* Adjust width as needed */
  max-height: 800px;
  /* Adjust height as needed */
}

/* header column modal */
.custom-thead-bg thead th {
  background-color: #f9ebec;
  font-weight: bold;
}

.container-column {
  display: flex;
  justify-content: flex-start;

}

.close-btn {
  display: flex;
  justify-content: flex-end;
}

.fc-toolbar-chunk {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.fc-toolbar {
  display: flex;
  align-items: center;
  justify-content: flex-start;
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

.fc-scrollgrid-section .fc-scrollgrid-section-body .fc-scrollgrid-section-liquid {
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
  top: 50px;
  /* Sesuaikan posisi dengan kebutuhan */
  left: 0;
  /* Sesuaikan posisi dengan kebutuhan */
  z-index: 3;
  height: 100px;
  /* Pastikan berada di bawah angka tanggal */
  background-color: #fff;
  /* Tambahkan latar belakang jika diperlukan */
  border: 1px solid #ccc;
  /* Tambahkan border jika diperlukan */
}

/* Specific styles for CKD and NON CKD items */
.green-item {
  background-color: #a2deb1;
  /* Green background */
}

.yellow-item {
  background-color: #fdce62;
  /* Yellow background */
}

.fc-daygrid-day {
  height: 60px;
  /* Sesuaikan dengan tinggi yang diinginkan */
}

/* Atur tinggi header untuk hari Sabtu dan Minggu */
.fc-col-header-cell.fc-day-sun,
.fc-col-header-cell.fc-day-sat {
  background-color: #f9ebec;
  /* Background color */
  color: red;
  /* Text color */
  text-align: left;
  /* Align text to the left */
  padding-left: 10px;
  /* Padding for alignment */
  height: 50px;
  /* Set height */
  line-height: 50px;
  /* Align text vertically */
}

/* CSS tambahan untuk responsivitas */
@media (max-width: 600px) {

  .fc-col-header-cell.fc-day-sun,
  .fc-col-header-cell.fc-day-sat {
    background-color: #ffebee;
    /* Lighter background color for small screens */
    height: 40px;
    /* Adjust height for small screens if needed */
    line-height: 40px;
    /* Adjust line-height for vertical alignment */
  }
}

@media (min-width: 601px) and (max-width: 1024px) {

  .fc-col-header-cell.fc-day-sun,
  .fc-col-header-cell.fc-day-sat {
    background-color: #f9ebec;
    /* Medium background color for tablets */
    height: 50px;
    /* Ensure height is consistent */
    line-height: 50px;
    /* Ensure text alignment */
  }
}

@media (min-width: 1025px) {

  .fc-col-header-cell.fc-day-sun,
  .fc-col-header-cell.fc-day-sat {
    background-color: #fce4ec;
    /* Default background color for large screens */
    height: 50px;
    /* Consistent height for large screens */
    line-height: 50px;
    /* Ensure vertical alignment */
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
  justify-content: flex-start;
  /* Atur teks ke sebelah kiri */
  padding-left: 10px;
  /* Tambahkan padding kiri */
}

/* Menghilangkan border, outline, dan shadow pada tombol prev dan next di semua keadaan */
.fc-prev-button,
.fc-next-button {
  border: none !important;
  /* Menghilangkan border default */
  outline: none !important;
  /* Menghilangkan outline default */
  box-shadow: none !important;
  /* Menghilangkan shadow default */
}

.fc-prev-button:hover .fc-icon,
.fc-next-button:hover .fc-icon {
  color: #909090 !important;
  /* Ganti dengan warna yang diinginkan, misalnya abu-abu */
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
  border: none !important;
  /* Menghilangkan border saat hover, fokus, dan aktif */
  outline: none !important;
  /* Menghilangkan outline saat hover, fokus, dan aktif */
  box-shadow: none !important;
  /* Menghilangkan shadow saat hover, fokus, dan aktif */
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
