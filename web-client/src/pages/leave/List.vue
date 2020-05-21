<template>
  <v-card>
    <v-toolbar flat>
      <v-toolbar-title class="font-weight-bold">Leave List</v-toolbar-title>
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
      <v-btn icon>
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-toolbar>
    <v-data-table :headers="headers" :items="testData">
      <template v-slot:item.action>
        <v-btn icon :to="{ name: 'leave-form' }">
          <v-icon>
            mdi-eye
          </v-icon>
        </v-btn>
      </template>
    </v-data-table>
    <router-view></router-view>
  </v-card>
</template>

<script>
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
          text: "Span",
          value: "span",
        },

        {
          text: "Status",
          value: "status",
        },

        {
          text: "Action",
          value: "action",
        },
      ],

      testData: [
        {
          employeeNumber: "1000-000-1000",
          name: "Employee Name",
          span: "May 21, 2020 - May 22, 2020",
          status: "Pending",
        },
      ],
    };
  },
};
</script>
