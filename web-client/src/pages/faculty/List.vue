<template>
  <v-card>
    <v-toolbar flat>
      <v-toolbar-title class="font-weight-bold">Faculty List</v-toolbar-title>
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

      <template v-slot:item.department="{ item }">
        <span class="text-capitalize">{{ item.department.name }}</span>
      </template>

      <template v-slot:item.designation="{ item }">
        <span class="text-capitalize">{{ item.designation.name }}</span>
      </template>

      <template v-slot:item.action="{ item }">
        <v-btn icon @click="viewFaculty"><v-icon>mdi-eye</v-icon></v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import customUtilities from "../../common/customUtilities";

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
          text: "Department",
          value: "department",
        },

        {
          text: "Designation",
          value: "designation",
        },

        {
          text: "Action",
          value: "action",
        },
      ],

      items: [
        {
          employeeNumber: "employee-1",
          profile: {
            firstName: "Faculty",
            middleName: "Faculty",
            lastName: "Faculty",
            extension: "Faculty",
          },
          department: {
            name: "department",
          },
          designation: {
            name: "designation",
          },
        },
      ],
    };
  },

  mixins: [customUtilities],

  methods: {
    viewFaculty() {
      this.$router.push({ name: "faculty-form" });
    },
  },
};
</script>
