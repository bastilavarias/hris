<template>
  <v-card>
    <v-card-title class="font-weight-bold"
      >Faculty Schedule Viewer</v-card-title
    >
    <v-card-text>
      <custom-faculty-schedule-calendar></custom-faculty-schedule-calendar>
    </v-card-text>
  </v-card>
</template>
<script>
import CustomFacultyScheduleCalendar from "../components/custom/CustomFacultyScheduleViewer";
export default {
  components: { CustomFacultyScheduleCalendar },
};
</script>
