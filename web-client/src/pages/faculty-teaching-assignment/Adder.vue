<template>
  <div>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title class="font-weight-bold">
            <span>Faculty Information</span>
            <div class="flex-grow-1"></div>
            <v-btn icon>
              <v-icon>mdi-magnify</v-icon>
            </v-btn>
          </v-card-title>
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
        </v-card>
      </v-col>
      <v-col cols="12" md="5">
        <v-card min-height="250">
          <v-toolbar flat>
            <v-toolbar-title class="font-weight-bold"
              >Subject Schedules
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-text-field
              hide-details
              prepend-inner-icon="mdi-magnify"
              outlined
              dense
              placeholder="Search here"
            ></v-text-field>
            <v-btn icon>
              <v-icon>mdi-sort</v-icon>
            </v-btn>
          </v-toolbar>
          <v-data-table :headers="scheduleTableHeaders"></v-data-table>
        </v-card>
      </v-col>
      <v-col cols="12" md="7">
        <v-card min-height="250">
          <v-card-title class="font-weight-bold"
            >Faculty Teaching Assignment Overview</v-card-title
          >
          <v-card-subtitle>First Semester, SY: 2020-2021</v-card-subtitle>
          <v-data-table
            hide-default-footer
            :headers="facultyLoadOverviewTableHeaders"
          ></v-data-table>
          <v-card-actions>
            <v-btn color="primary" block>Submit(0)</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      scheduleTableHeaders: [
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
          text: "Day & Time",
        },

        {
          text: "Actions",
        },
      ],

      facultyLoadOverviewTableHeaders: [
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
          text: "Day & Time",
        },

        {
          text: "Actions",
        },
      ],
    };
  },
};
</script>
