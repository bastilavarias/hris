<template>
  <div>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title class="font-weight-bold">
            Personal FTA Adder
          </v-card-title>
          <v-card-subtitle>First Semester, SY: 2020-2021</v-card-subtitle>
          <v-card-text>
            <v-row dense>
              <v-col cols="12" md="6">
                <span class="d-block">
                  <span class="font-weight-bold mr-1">Name:</span>
                  <span>Lorem ipsum dolor sit amet.</span>
                </span>
                <span class="d-block">
                  <span class="font-weight-bold mr-1">Rank:</span>
                  <span>Lorem ipsum dolor sit amet.</span>
                </span>
                <span class="d-block">
                  <span class="font-weight-bold mr-1"
                    >Academic Qualification(s):</span
                  >
                  <span>Lorem ipsum dolor sit amet.</span>
                </span>
              </v-col>
              <v-col cols="12" md="6">
                <span class="d-block">
                  <span class="font-weight-bold mr-1">College:</span>
                  <span>Lorem ipsum dolor sit amet.</span>
                </span>
                <span class="d-block">
                  <span class="font-weight-bold mr-1">PRC License:</span>
                  <span>Lorem ipsum dolor sit amet.</span>
                </span>
                <span class="d-block">
                  <span class="font-weight-bold mr-1">Appointment Status:</span>
                  <span>Lorem ipsum dolor sit amet.</span>
                </span>
              </v-col>
            </v-row>
          </v-card-text>
          <v-data-table hide-default-footer :headers="scheduleHeaders">
            <template v-slot:top>
              <v-card-text>
                <v-toolbar flat>
                  <v-spacer></v-spacer>
                  <v-btn icon @click="isSearchClassScheduleDialogShow = true">
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                  <v-btn
                    icon
                    @click="
                      isFinalTeachingingAssignmentSummaryDialogShow = true
                    "
                  >
                    <v-icon>mdi-text-box-check</v-icon>
                  </v-btn>
                </v-toolbar>
              </v-card-text>
            </template>
          </v-data-table>
          <v-card-actions>
            <v-btn color="primary" block>Submit(0)</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <generic-search-dialog
      :is-show.sync="isSearchClassScheduleDialogShow"
      title="Class Schedules"
      :items="[]"
    ></generic-search-dialog>
    <custom-final-teaching-assignment-summary-dialog
      :is-show.sync="isFinalTeachingingAssignmentSummaryDialogShow"
    ></custom-final-teaching-assignment-summary-dialog>
  </div>
</template>

<script>
import GenericSearchDialog from "../../components/generic/GenericSearchDialog";
import CustomFinalTeachingAssignmentSummaryDialog from "../../components/custom/CustomFinalTeachingAssignmentSummaryDialog";
export default {
  components: {
    CustomFinalTeachingAssignmentSummaryDialog,
    GenericSearchDialog,
  },
  data() {
    return {
      scheduleHeaders: [
        {
          text: "Code",
        },

        {
          text: "Title",
        },

        {
          text: "Units",
        },

        {
          text: "Section",
        },

        {
          text: "Day & Time & Room",
        },

        {
          text: "Credited Unit",
        },

        {
          text: "College",
        },

        {
          text: "Extra Load",
          align: "right",
        },
      ],

      isSearchClassScheduleDialogShow: false,
      isFinalTeachingingAssignmentSummaryDialogShow: false,
    };
  },
};
</script>
