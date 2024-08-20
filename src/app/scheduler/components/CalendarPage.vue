<template>
  <q-page class="q-pa-md">
    <q-card>
      <q-card-section>
        <!-- Calendar -->
        <div id="mycalendar">
          <FullCalendar :options="calendarOptions" />
        </div>
        <!-- Dropdown for view options -->
        <div class="dropdown-view-selector">
          <select @change="changeView($event.target.value)">
            <option value="dayGridMonth">Month</option>
            <option value="timeGridWeek">Week</option>
            <option value="timeGridDay">Day</option>
          </select>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid"; // Plugin untuk tampilan mingguan dan harian
import interactionPlugin from "@fullcalendar/interaction";
import { Draggable } from "@fullcalendar/interaction";

export default defineComponent({
  name: "CalendarPage",
  components: {
    FullCalendar,
  },
  setup() {
    const calendarOptions = ref({
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      initialView: "dayGridMonth",
      weekends: true,
      editable: true,
      droppable: true,
      headerToolbar: {
        left: "prev title next", // Menempatkan tombol 'prev', 'title', dan 'next' di sebelah kiri
        center: "", // Kosongkan bagian tengah
        right: "", // Kosongkan bagian kanan
      },
      events: [
        // Your event data
      ],
      dayHeaderContent: (args) => {
        if (args.date.getDay() === 0 || args.date.getDay() === 6) {
          return {
            html: `<span class="red-day">${args.text}</span>`,
          };
        }
        return args.text;
      },
    });

    const changeView = (viewName) => {
      const calendarApi = document
        .getElementById("mycalendar")
        ._calendar.getApi();
      calendarApi.changeView(viewName);
    };

    onMounted(() => {
      new Draggable(document.getElementById("mycalendar"), {
        itemSelector: ".draggable-item",
        eventData: (eventEl) => {
          return {
            title: eventEl.innerText,
            color: eventEl.classList.contains("green-item")
              ? "#a0e4b0"
              : "#ffd66b",
          };
        },
      });
    });

    return {
      calendarOptions,
      changeView,
    };
  },
});
</script>

<style>
.fc-toolbar-chunk {
  display: flex;
  justify-content: flex-start; /* Align toolbar to the left */
  align-items: center;
}
/* Style untuk menempatkan dropdown tepat di sebelah tombol next */
.dropdown-view-selector {
  display: inline-block;
  margin-left: 10px; /* Jarak antara dropdown dan tombol next */
  vertical-align: middle; /* Pastikan dropdown sejajar dengan tombol */
}

.dropdown-view-selector select {
  padding: 5px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.fc .fc-button-primary {
  background-color: #fff;
  border-color: #ffff;
  color: #b0b0b0;
}

/* Gaya untuk tombol prev dan next saat hover */
.fc-prev-button:hover,
.fc-next-button:hover {
  background-color: #e0e0e0; /* Warna latar belakang saat hover (abu-abu muda) */
  color: #f2eded; /* Warna teks saat hover */
}

.fc-toolbar-title {
  margin: 0 10px; /* Jarak antara title dan tombol prev/next */
}

/* Optional: Adjust the font size and weight of the title */
.fc-toolbar-title {
  font-size: 16px;
  font-weight: bold;
}

.fc-button-group {
  margin-left: 20px; /* Jarak antara group toggle dan title */
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
  z-index: 1; /* Pastikan berada di bawah angka tanggal */
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

/* Make sure all header cells have the same height */
.fc-col-header-cell {
  text-align: left;
  height: 50px; /* Default height for all header cells */
  line-height: 50px; /* Vertical alignment */
}

#mycalendar {
  margin-top: 20px;
}
</style>
