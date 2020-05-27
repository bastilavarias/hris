<template>
  <v-card>
    <v-toolbar flat>
      <v-toolbar-title class="font-weight-bold"
        >Department List</v-toolbar-title
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
      <v-btn icon :to="{ name: 'department-form' }">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-toolbar>
    <v-data-table :headers="headers" :items="items">
      <template v-slot:item.name="{ item }">
        <span class="text-capitalize">{{ item.name }}</span>
      </template>

      <template v-slot:item.description="{ item }">
        <span class="text-capitalize">{{ item.description }}</span>
      </template>

      <template v-slot:item.head="{ item }">
        <span class="text-capitalize">{{
          formatFullName(item.head.profile)
        }}</span>
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
          text: "Name",
          value: "name",
        },

        {
          text: "Description",
          value: "description",
        },

        {
          text: "Head",
          value: "head",
        },

        {
          text: "Actions",
          align: "right",
          value: "actions",
        },
      ],

      items: [
        {
          name: "Department 1",
          description: "Department 1",
          head: {
            profile: {
              firstName: "Head 1",
              middleName: "Head 1",
              lastName: "Head 1",
              extension: "Head 1",
            },
          },
        },
      ],
    };
  },

  mixins: [customUtilities],
};
</script>
