<template>
  <v-card>
    <v-toolbar flat>
      <v-toolbar-title class="font-weight-bold"
        >Attendance List</v-toolbar-title
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
    </v-toolbar>
    <v-data-table :headers="headers" :items="items">
      <template v-slot:item.employeeNumber="{ item }">
        <span class="text-uppercase font-weight-bold">{{
          item.employeeNumber
        }}</span>
      </template>

      <template v-slot:item.name="{ item }">
        <span class="text-capitalize">{{ formatFullName(item.profile) }}</span>
      </template>

      <template v-slot:item.date="{ item }">
        <span class="text-capitalize">{{ item.attendance.date }}</span>
      </template>

      <template v-slot:item.timeIn="{ item }">
        <span class="text-capitalize">{{ item.attendance.timeIn }}</span>
      </template>

      <template v-slot:item.timeOut="{ item }">
        <span class="text-capitalize">{{ item.attendance.timeOut }}</span>
      </template>

      <template v-slot:item.encodedBy="{ item }">
        <span class="text-capitalize">{{
          formatFullName(item.encodedBy.profile)
        }}</span>
      </template>
    </v-data-table>
    <router-view></router-view>
  </v-card>
</template>

<script>
import customUtilities from "../common/customUtilities";

export default {
  data() {
    return {
      headers: [
        {
          text: "Employee Number",
          value: "employeeNumber",
        },

        {
          text: "Name",
          value: "name",
        },

        {
          text: "Date",
          value: "date",
        },

        {
          text: "Time In",
          value: "timeIn",
        },

        {
          text: "Time Out",
          value: "timeOut",
        },

        {
          text: "Encoded By",
          value: "encodedBy",
        },
      ],

      items: [
        {
          employeeNumber: "employee-1",
          profile: {
            firstName: "Employee-1",
            middleName: "Employee-1",
            lastName: "Employee-1",
            extension: "Employee-1",
          },
          attendance: {
            date: "May 21, 2000",
            timeIn: "8:00 AM",
            timeOut: "5:00 PM",
          },
          encodedBy: {
            profile: {
              firstName: "Employee-2",
              middleName: "Employee-2",
              lastName: "Employee-2",
              extension: "Employee-2",
            },
          },
        },
      ],
    };
  },
  mixins: [customUtilities],
};
</script>
