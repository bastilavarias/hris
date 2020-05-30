<template>
  <v-card>
    <v-toolbar flat>
      <v-toolbar-title class="font-weight-bold"
        >Class Schedule List</v-toolbar-title
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
      <v-btn icon :to="{ name: 'class-schedule-form' }">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-toolbar>
    <v-data-table :headers="headers" :items="items">
      <template v-slot:top>
        <v-card-text>
          <v-chip label color="primary" class="mr-1"
            >Semester: Current Semester</v-chip
          >
          <v-chip label color="primary"
            >School Year: Current School Year</v-chip
          >
        </v-card-text>
      </template>

      <template v-slot:item.section="{ item }">
        <span class="text-capitalize">{{ item.section.name }}</span>
      </template>

      <template v-slot:item.subject="{ item }">
        <span class="text-capitalize">{{ item.subject.title }}</span>
      </template>

      <template v-slot:item.faculty="{ item }">
        <span class="text-capitalize">{{
          formatFullName(item.faculty.profile)
        }}</span>
      </template>

      <template v-slot:item.dayTimeRoom="{ item }">
        <span class="text-capitalize"
          >{{ item.dayTimeRoom.day }} / {{ item.dayTimeRoom.time }} /
          {{ item.dayTimeRoom.room }}</span
        >
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
          text: "Section",
          value: "section",
        },

        {
          text: "Subject",
          value: "subject",
        },

        {
          text: "Faculty",
          value: "faculty",
        },

        {
          text: "Day, Time & Room",
          value: "dayTimeRoom",
        },

        {
          text: "Actions",
          align: "right",
          value: "actions",
        },
      ],

      items: [
        {
          section: {
            name: "section",
          },
          subject: {
            title: "subject",
          },
          faculty: {
            profile: {
              firstName: "Faculty",
              middleName: "Faculty",
              lastName: "Faculty",
              extension: "Faculty",
            },
          },
          dayTimeRoom: {
            day: "Monday",
            time: "10:00AM - 12:00PM",
            room: "Room 101",
          },
        },
      ],
    };
  },

  mixins: [customUtilities],
};
</script>
