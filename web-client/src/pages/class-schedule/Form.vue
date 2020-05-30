<template>
  <v-dialog width="1000" v-model="isClassScheduleDialogShow">
    <v-card>
      <v-card-title class="font-weight-bold">
        <span>Class Schedule Form</span>
        <div class="flex-grow-1"></div>
        <v-btn icon @click="isClassScheduleDialogShow = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-row dense>
          <v-col cols="12">
            <v-text-field label="Section" outlined></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field label="Subject" outlined></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field label="Faculty" outlined></v-text-field>
          </v-col>
          <v-col cols="12">
            <custom-form-subtitle>
              <span>
                Day / Time / Room
              </span>
              <div class="flex-grow-1"></div>
              <v-btn
                color="primary"
                small
                @click="isDayTimeRoomDialogShow = true"
              >
                <v-icon class="mr-1">mdi-plus</v-icon>
                <span>Add DTR</span>
              </v-btn>
            </custom-form-subtitle>
            <v-data-table
              :headers="dayTimeRoomTableHeaders"
              hide-default-footer
            >
            </v-data-table>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" block>
          Submit
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-dialog v-model="isDayTimeRoomDialogShow" width="800">
      <v-card>
        <v-card-title class="font-weight-bold"
          >Day / Time / Room Form</v-card-title
        >
        <v-card-text>
          <v-row dense>
            <v-col cols="12">
              <v-select label="Day" outlined></v-select>
            </v-col>
            <v-col cols="12">
              <v-select label="Time" outlined></v-select>
            </v-col>
            <v-col cols="12">
              <v-select label="Room" outlined></v-select>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-dialog>
</template>

<script>
import CustomFormSubtitle from "../../components/custom/CustomFormSubtitle";
export default {
  components: { CustomFormSubtitle },
  data() {
    return {
      isClassScheduleDialogShow: false,

      isDayTimeRoomDialogShow: false,

      dayTimeRoomTableHeaders: [
        {
          text: "Day",
        },

        {
          text: "Time",
        },

        {
          text: "Room",
        },

        {
          text: "Action",
        },
      ],
    };
  },

  watch: {
    isClassScheduleDialogShow(isClassScheduleDialogShow) {
      if (!isClassScheduleDialogShow)
        return this.$router.push({ name: "class-schedule-list" });
    },
  },

  mounted() {
    this.isClassScheduleDialogShow = true;
  },
};
</script>
