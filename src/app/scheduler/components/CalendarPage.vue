<script>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'

document.addEventListener('DOMContentLoaded', function () {
  let draggableEl = document.getElementById('mydraggable');
  let calendarEl = document.getElementById('mycalendar');

  let calendar = new Calendar(calendarEl, {
    plugins: [interactionPlugin],
    droppable: true
  });
  calendar.render();

  let draggable = new Draggable(draggableEl);
})

var calendar


new Draggable(containerEl, {
  itemSelector: '.item-class'
});

  export default {
    components: {
      FullCalendar
    },
    data() {
      return {
        calendarOptions: {
          plugins: [dayGridPlugin, interactionPlugin],
          initialView: 'dayGridMonth',
          weekends: true
        }
      }
    },
  }
</script>
<template>
  <div id='draggable-el' data-event='{ "title": "my event", "duration": "02:00" }'>drag me</div>
  <FullCalendar :options="calendarOptions" />
</template>
