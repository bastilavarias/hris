<template>
  <v-card>
    <v-card-title class="font-weight-bold">Faculty Form</v-card-title>
    <v-tabs v-model="tab" fixed-tabs>
      <template v-for="(tabName, index) in tabs">
        <v-tab :key="index">{{ tabName }}</v-tab>
      </template>
    </v-tabs>
    <v-card-text>
      <v-tabs-items v-model="tab">
        <v-tab-item>
          <v-row dense>
            <v-col cols="12">
              <faculty-form-information></faculty-form-information>
            </v-col>
          </v-row>
        </v-tab-item>
        <v-tab-item>
          <v-row dense>
            <v-col cols="12">
              <faculty-form-schedule></faculty-form-schedule>
            </v-col>
          </v-row>
        </v-tab-item>
      </v-tabs-items>
    </v-card-text>
  </v-card>
</template>

<script>
import CustomFormSubtitle from "../../components/custom/CustomFormSubtitle";
import FacultyFormInformation from "./FormInformation";
import FacultyFormSchedule from "./FormSchedule";
export default {
  components: {
    FacultyFormSchedule,
    FacultyFormInformation,
    CustomFormSubtitle,
  },

  data() {
    return {
      tab: null,
      tabs: ["Information", "Schedule"],
    };
  },
};
</script>
