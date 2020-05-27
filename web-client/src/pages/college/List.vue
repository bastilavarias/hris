<template>
  <v-card>
    <v-toolbar flat>
      <v-toolbar-title class="font-weight-bold">College List</v-toolbar-title>
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
      <v-btn icon :to="{ name: 'college-form' }">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-toolbar>
    <v-data-table :headers="headers" :items="colleges">
      <template v-slot:item.customId="{ item }">
        <span class="font-weight-bold text-uppercase">{{ item.customId }}</span>
      </template>

      <template v-slot:item.name="{ item }">
        <span class="text-capitalize">{{ item.name }}</span>
      </template>

      <template v-slot:item.dean="{ item }">
        <span class="text-capitalize">{{
          formatFullName(item.dean.profile)
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
          text: "ID",
          value: "customId",
        },

        {
          text: "Name",
          value: "name",
        },

        {
          text: "Dean",
          value: "dean",
        },

        {
          text: "Actions",
          value: "actions",
        },
      ],

      colleges: [
        {
          customId: "ID-1",
          name: "College-1",
          dean: {
            profile: {
              firstName: "Dean",
              middleName: "Dean",
              lastName: "Dean",
              extension: "Dean",
            },
          },
        },

        {
          customId: "ID-2",
          name: "College-2",
          dean: {
            profile: {
              firstName: "Dean",
              middleName: "Dean",
              lastName: "Dean",
              extension: "Dean",
            },
          },
        },
      ],
    };
  },
  mixins: [customUtilities],
};
</script>
