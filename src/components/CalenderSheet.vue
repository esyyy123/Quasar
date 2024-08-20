<script>
import FullCalendar from '@fullcalendar/vue3/dist/FullCalendar';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Interaction } from '@fullcalendar/core/internal';
</script>


<template>
  
  <FullCalendar :options="calendarOptions">
    <template v-slot:eventContent='arg'>
      <b>{{ arg.event.title }}</b>
    </template>

  </FullCalendar>
</template>
