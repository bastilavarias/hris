<template>
  <v-card>
    <v-toolbar flat>
      <v-toolbar-title class="font-weight-bold"
        >Personal Leave List</v-toolbar-title
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
      <v-btn icon :to="{ name: 'personal-leave-form' }">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-toolbar>
    <v-data-table :headers="headers" :items="colleges">
      <template v-slot:item.type="{ item }">
        <span class="text-capitalize">{{ item.type }}</span>
      </template>

      <template v-slot:item.date="{ item }">
        <span class="text-capitalize"
          >{{ item.date.from }} - {{ item.date.to }}</span
        >
      </template>

      <template v-slot:item.status="{ item }">
        <span class="text-capitalize">{{ item.status }}</span>
      </template>

      <template v-slot:item.actions="{ item }">
        <v-btn icon><v-icon>mdi-pencil</v-icon></v-btn>
        <v-btn icon><v-icon>mdi-trash-can</v-icon></v-btn>
      </template>
    </v-data-table>
    <router-view></router-view>
  </v-card>
</template>

<script>
import customUtilities from "../../common/customUtilities";

export default {
  data() {
    return {
      headers: [
        {
          text: "Type",
          value: "type",
        },

        {
          text: "Date",
          value: "date",
        },

        {
          text: "Status",
          value: "status",
        },

        {
          text: "Actions",
          value: "actions",
        },
      ],

      colleges: [
        {
          type: "Leave Type 1",
          date: {
            from: "May 21, 2020",
            to: "May 25, 2020",
          },
          status: "Pending",
        },

        {
          type: "Leave Type 2",
          date: {
            from: "May 21, 2020",
            to: "May 25, 2020",
          },
          status: "Approve",
        },
      ],
    };
  },
  mixins: [customUtilities],
};
</script>
