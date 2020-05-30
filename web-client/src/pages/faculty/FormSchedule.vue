<template>
  <custom-faculty-schedule-viewer></custom-faculty-schedule-viewer>
</template>

<script>
import CustomFormSubtitle from "../../components/custom/CustomFormSubtitle";
import GenericCalendar from "../../components/generic/GenericCalendar";
import CustomFacultyScheduleViewer from "../../components/custom/CustomFacultyScheduleViewer";
export default {
  name: "faculty-form-schedule",
  components: {
    CustomFacultyScheduleViewer,
    GenericCalendar,
    CustomFormSubtitle,
  },
};
</script>
