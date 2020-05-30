<template>
  <v-card>
    <v-toolbar flat>
      <v-toolbar-title class="font-weight-bold"
        >Activity Log List</v-toolbar-title
      >
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
      <v-btn icon @click="isDateRangeFormDialogShow = true">
        <v-icon>mdi-calendar</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
    </v-toolbar>
    <v-data-table :headers="headers"></v-data-table>
    <v-dialog width="800" v-model="isDateRangeFormDialogShow">
      <v-card>
        <v-card-title class="font-weight-bold">
          <span>Date Ranges Form</span>
          <div class="flex-grow-1"></div>
          <v-btn icon @click="isDateRangeFormDialogShow = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-row dense>
            <v-col cols="12" md="6">
              <v-select outlined label="Date From"></v-select>
            </v-col>
            <v-col cols="12" md="6">
              <v-select outlined label="Date To"></v-select>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        {
          text: "Name",
        },

        {
          text: "Type",
        },

        {
          text: "Date & Time",
        },
      ],

      isDateRangeFormDialogShow: false,
    };
  },
};
</script>
