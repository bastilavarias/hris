<template>
  <v-card>
    <v-card-title>
      <generic-back-button title="Faculty Schedule Form"></generic-back-button>
      <div class="flex-grow-1"></div>
      <v-btn icon>
        <v-icon>mdi-information</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-text>
      <v-row dense>
        <v-col cols="12">
          <v-autocomplete label="Section" outlined></v-autocomplete>
        </v-col>
        <v-col cols="12">
          <v-autocomplete label="Subject" outlined></v-autocomplete>
        </v-col>
        <v-col cols="12">
          <v-autocomplete label="Faculty" outlined></v-autocomplete>
        </v-col>
        <v-col cols="12">
          <span class="v-label theme--light">Day / Time / Room</span>
          <v-row dense v-if="!isScheduleDayTimeRoomTBA">
            <v-col cols="12" md="3">
              <v-select label="Day"></v-select>
            </v-col>
            <v-col cols="12" md="2">
              <generic-time-picker
                :time.sync="time"
                label="Start Time"
              ></generic-time-picker>
            </v-col>
            <v-col cols="12" md="2">
              <generic-time-picker
                :time.sync="time"
                label="End Time"
              ></generic-time-picker>
            </v-col>
            <v-col cols="12" md="3">
              <v-autocomplete label="Room"></v-autocomplete>
            </v-col>
            <v-col cols="12" md="2" align-self="center">
              <v-row justify="center" align="center">
                <v-btn color="primary" fab small class="mr-2">
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
                <v-btn color="error" fab small>
                  <v-icon>mdi-trash-can</v-icon>
                </v-btn>
              </v-row>
            </v-col>
          </v-row>
          <v-checkbox color="primary" v-model="isScheduleDayTimeRoomTBA">
            <template v-slot:label
              >Is day, time, and room is to be announce?
            </template>
          </v-checkbox>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" block>Submit</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import GenericCardBackButton from "../../../components/generic/CardBackButton";
import GenericTimePicker from "../../../components/generic/TimePicker";
import GenericBackButton from "../../../components/generic/BackButton";
import { getAllSections } from "../../../store/types/section";
import { getAllSubjects } from "../../../store/types/subject";

export default {
  name: "schedule-schedule-form",
  components: { GenericBackButton, GenericTimePicker, GenericCardBackButton },

  data() {
    return {
      time: null,
      isScheduleDayTimeRoomTBA: false,
      dayTimeRoom: []
    };
  },

  created() {
    this.$store.dispatch(getAllSections);
    this.$store.dispatch(getAllSubjects);
  }
};
</script>
