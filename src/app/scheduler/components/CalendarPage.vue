<script>
import { defineComponent, ref, onMounted, watch } from "vue";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import multiMonthPlugin from "@fullcalendar/multimonth";
import { QDialog, QDate, QCard, QCardSection, QBtn, QTable } from "quasar";

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
    const isMonthlySelected = ref(false);
    const calendarTitle = ref("");
    const showModal = ref(false);
    const selectedEvent = ref(null);
    const selectedBrand = ref("all customer");
    const eventsData = ref([]);
    const selectedLabel = ref("");
    const showDatePicker = ref(false);
    const date = ref(calendarTitle);
    const selectedCustomers = ref([]);

    const columns = [
      { name: "id", label: "No", align: "left", field: "id" },
      { name: "customer", label: "Customer", align: "left", field: "customer" },
      { name: "brand", label: "CKD", align: "left", field: "CKD" },
      { name: "start", label: "Non CKD", align: "left", field: "NONCKD" },
    ];

    const optionsCustomer = [
      { label: "All Customer", value: "all" },
      { label: "xiaomi", value: "xiaomi" },
      { label: "asus", value: "asus" },
      { label: "vivo", value: "vivo" },
      { label: "oppo", value: "oppo" },
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
        dayGridWeek: {
          dayHeaderFormat: { weekday: "long" },
        },
        timeGridWeek: {
          dayHeaderFormat: { weekday: "long" },
        },
      },
      events: [
        {
          id: "1",
          title: "CKD 480",
          CKD: "480",
          NONCKD: "-",
          customer: "oppo",
          start: "2024-08-16",
          end: "2024-08-18",
          displayEventTime: true,
          editable: true,
          allDay: true,
        },
        {
          id: "2",
          title: "NONCKD 480",
          CKD: "480",
          NONCKD: "-",
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
          title: "CKD 450",
          CKD: "450",
          NONCKD: "-",
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
        selectedEvent.value = info.event
          ? {
            id: info.event.id,
            customer: info.event.extendedProps.customer,
            start: info.event.start,
            CKD: info.event.extendedProps.CKD,
            NONCKD: info.event.extendedProps.NONCKD,
            brand: info.event.title,
            end: info.event.end,
          }
          : null;
        showModal.value = true;
      },
      datesSet: (info) => {
        const view = info.view;
        updateTitle(view);

        if (view.type === "dayGridWeek") {
          addDatesToColumns();
        } else {
          document
            .querySelectorAll(".custom-date")
            .forEach((element) => element.remove());
        }
        loadEventsIntoTable();
      },
      height: "75vh",
      contentHeight: "75vh",
    });

    const addDatesToColumns = () => {
      const calendarApi = fullCalendarRef.value?.getApi();
      if (calendarApi) {
        setTimeout(() => {
          const dayCells = document.querySelectorAll(".fc-daygrid-day");
          dayCells.forEach((cell) => {
            const date = cell.getAttribute("data-date");
            if (date) {
              const formattedDate = new Date(date).toLocaleDateString("id-ID", {
                day: "2-digit",
              });
              let dateElement = cell.querySelector(".custom-date");
              if (!dateElement) {
                dateElement = document.createElement("div");
                dateElement.classList.add("custom-date");
                cell.prepend(dateElement);
              }
              dateElement.innerText = formattedDate;
            }
          });
        }, 100);
      }
    };

    // Function to handle selection
    const onSelectCustomer = (val) => {
      if (val.includes("selectAll")) {
        // If "Select All" is selected, select all customers and remove "Select All" from the selected list
        selectedCustomers.value = optionsCustomer.value
          .filter((option) => option.value !== "selectAll")
          .map((option) => option.value);
      } else {
        // If "Select All" is not selected, just update the selected customers
        selectedCustomers.value = val;
      }
    };

    const showDate = () => {
      showDatePicker.value = true;
    };

    const ondateSelected = () => {
      showDatePicker.value = false;
    };

    const updateTitle = (view) => {
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      const start = new Date(view.currentStart);
      const monthName = monthNames[start.getMonth()];
      const year = start.getFullYear();
      calendarTitle.value = `${monthName} ${year}`;
    };

    const prev = () => {
      const calendarApi = fullCalendarRef.value?.getApi();
      if (calendarApi) {
        calendarApi.prev();
        updateTitle(calendarApi.view);
      }
    };

    const next = () => {
      const calendarApi = fullCalendarRef.value?.getApi();
      if (calendarApi) {
        calendarApi.next();
        updateTitle(calendarApi.view);
      }
    };

    const changeView = (viewName) => {
      if (viewName === "Monthly") {
        isMonthlySelected.value = true; // Show custom Monthly view
        selectedView.value = "Monthly"; // Update label to reflect the selected view
      } else {
        isMonthlySelected.value = false; // Hide custom Monthly view
        if (fullCalendarRef.value) {
          const calendarApi = fullCalendarRef.value.getApi();
          if (calendarApi) {
            calendarApi.changeView(viewName);
            selectedView.value =
              viewName === "dayGridMonth"
                ? "Daily"
                : viewName === "dayGridWeek"
                  ? "Weekly"
                  : "";
            updateTitle(calendarApi.view);
            loadEventsIntoTable();
          }
        }
      }
    };

    const selectAllCustomers = () => {
      selectedCustomers.value = optionsCustomer.map((option) => option.value);
      selectedLabel.value = "Select All";
    };

    const deselectAllCustomers = () => {
      selectedCustomers.value = [];
      selectedLabel.value = "";
    };

    const loadEventsIntoTable = () => {
      const calendarApi = fullCalendarRef.value?.getApi();
      if (calendarApi) {
        const events = calendarApi.getEvents();
        eventsData.value = events.map((event) => ({
          id: event.id,
          customer: event.extendedProps.customer,
          CKD: event.extendedProps.CKD,
          NONCKD: event.extendedProps.NONCKD,
        }));
      }
    };

    const resizeCalendar = () => {
      const calendarApi = fullCalendarRef.value?.getApi();
      if (calendarApi) {
        calendarApi.updateSize();
      }
    };

    onMounted(() => {
      if (fullCalendarRef.value) {
        const calendarApi = fullCalendarRef.value.getApi();
        console.log("FullCalendar API initialized:", calendarApi);
        updateTitle(calendarApi.view);
        loadEventsIntoTable();
      }
      window.addEventListener("resize", resizeCalendar);
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
      selectedLabel,
      eventsData,
      optionsCustomer,
      showDate,
      ondateSelected,
      date,
      isMonthlySelected,
      selectedCustomers,
      onSelectCustomer,
      selectAllCustomers,
      deselectAllCustomers,
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
          <q-btn @click="showDate" class="fc-toolbar-title">
            {{ calendarTitle }}
          </q-btn>
          <q-popup-proxy v-model="showDatePicker" transition-show="none" transition-hide="none">
            <q-date ref="rDate" default-view="Months" v-model="date" years-in-month-view emit-immediately minimal
              mask="YYYY/MM" @update:model-value="$refs.rDate.setView('Months')" />
          </q-popup-proxy>
          <q-btn flat round icon="chevron_right" @click="next" />
          <q-btn-dropdown :label="selectedView" dropdown-icon="expand_more" style="
              text-transform: none;
              font-size: 16px;
              border-radius: 12px;
              border: 1px solid rgb(206, 211, 215);
              color: rgb(88, 88, 88);
              margin-left: 20px;
            ">
            <q-list>
              <q-item clickable v-close-popup @click="changeView('dayGridMonth')">
                <q-item-section>
                  <q-item-label>Daily</q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="changeView('dayGridWeek')">
                <q-item-section>
                  <q-item-label>Weekly</q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="changeView('Monthly')">
                <q-item-section>
                  <q-item-label>Monthly</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>

          <q-btn-dropdown :label="selectedLabel || 'All Customer'" dropdown-icon="expand_more" style="
              text-transform: none;
              font-size: 16px;
              border-radius: 12px;
              border: 1px solid rgb(206, 211, 215);
              color: rgb(88, 88, 88);
              margin-left: 20px;
            ">
            <q-list>
              <q-item clickable @click="selectAllCustomers">
                <q-item-section>
                  <q-item-label>Select All</q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable @click="deselectAllCustomers">
                <q-item-section>
                  <q-item-label>Deselect All</q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section>
                  <q-select filled v-model="selectedCustomers" use-input use-chips multiple input-debounce="0"
                    :options="optionsCustomer" option-value="value" dropdown-icon="expand_more"
                    @update:model-value="onSelectCustomer" style="
                      text-transform: none;
                      font-size: 16px;
                      border-radius: 12px;
                      border: 1px solid rgb(206, 211, 215);
                      color: rgb(88, 88, 88);
                      width: 300px;
                    " />
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </q-btn-group>
      </div>
    </div>
    <div class="q-pt-md">
      <div v-if="isMonthlySelected">
        <q-page-container>
          <div class="q-gutter-lg q-mt-lg row justify-center items-center">
            <q-btn color="red" label="Button" v-for="n in 6" :key="`lg-${n}`" />
          </div>
          <div class="q-gutter-lg q-mt-sm row justify-center items-center">
            <q-btn color="red" label="Button" v-for="n in 6" :key="`lg-${n}`" />
          </div>
        </q-page-container>
      </div>
      <div v-else>
        <FullCalendar ref="fullCalendarRef" :options="calendarOptions" />
      </div>
    </div>
    <!-- Modal Bar -->
    <q-dialog v-model="showModal" persistent>
      <q-card class="modalBar">
        <q-card-section>
          <div class="container-btn-title-modal">
            <div class="text-subtitle1 text-weight-bold q-pt-sm">Details</div>
            <q-btn class="close-btn" dense flat icon="close" @click="showModal = false" />
          </div>
          <hr class="solid" />
          <div class="container-column">
            <div class="q-ml-none">
              <div class="text-weight-regular text-caption">CKD</div>
              <div class="text-weight-bold text-h6">300</div>
            </div>
            <div class="q-ml-xl">
              <div class="text-weight-regular text-caption">NON CKD</div>
              <div class="text-weight-bold text-h6">450</div>
            </div>
          </div>
          <q-table class="custom-thead-bg" table-style="font-family: roboto; font-weight: bold;" :rows="eventsData"
            hide-bottom :columns="columns" :rows-per-page-options="[]" row-key="id" flat />
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<style>
/* background-color: #f9ebec; */

.fc-dayGridWeek-view table tbody .fc-scroller.fc-scroller-liquid-absolute {
  overflow: hidden !important;
}

.custom-date {
  font-size: 14px;
  padding: 4px;
  font-weight: bold;
}

/* modal bar size */
.modalBar {
  min-width: 30vw;
  min-height: 30vh;
  border-radius: 30px;
}

.fc .fc-daygrid-day-top {
  display: flex;
  flex-direction: row;
}

/* event bar sizing */
.fc-event {
  height: 31px;
  /* Atur tinggi event */
  line-height: 31px;
  /* Pastikan teks berada di tengah */
  font-size: 24px;
  font-weight: bold;
  border-radius: 20px;
  color: black !important;
}

/* force chnging color event bar  */
.fc-event-title-container {
  color: black;
  /* Ubah warna teks dalam judul event */
}

.container-btn-title-modal {
  display: flex;
  justify-content: space-between;
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

/* title  */
.fc-toolbar-title {
  font-size: 16px;
  font-weight: bold;
  margin-top: 10px;
  text-transform: capitalize;
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
  position: relative;
  padding: 5px 5px;
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
@media (max-0width: 600px) {

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
  flex-direction: column-reverse;
  /* Mengatur elemen dari bawah ke atas */
  align-items: flex-start;
  /* Menempatkan elemen ke sisi kiri */
  text-align: left !important;
}

.fc-daygrid-day-number {
  text-align: left;
  /* Mengatur teks ke kiri */
  justify-content: flex-start !important;
}

.fc-col-header-cell {
  text-align: left;
  height: 50px;
  line-height: 50px;
}
</style>
