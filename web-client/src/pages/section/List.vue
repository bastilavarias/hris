<template>
  <v-card>
    <v-toolbar flat>
      <v-toolbar-title class="font-weight-bold">Section List</v-toolbar-title>
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
      <v-btn icon :to="{ name: 'section-form' }">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-toolbar>
    <v-data-table :headers="headers" :items="items">
      <template v-slot:item.code="{ item }">
        <span class="font-weight-bold text-uppercase">{{ item.code }}</span>
      </template>

      <template v-slot:item.name="{ item }">
        <span class="text-capitalize">{{ item.name }}</span>
      </template>

      <template v-slot:item.college="{ item }">
        <span class="text-capitalize">{{ item.college.name }}</span>
      </template>

      <template v-slot:item.course="{ item }">
        <span class="text-capitalize">{{ item.course.name }}</span>
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
export default {
  data() {
    return {
      headers: [
        {
          text: "Code",
          value: "code",
        },

        {
          text: "Name",
          value: "name",
        },

        {
          text: "College",
          value: "college",
        },

        {
          text: "Course",
          value: "course",
        },

        {
          text: "Actions",
          align: "right",
          value: "actions",
        },
      ],

      items: [
        {
          code: "code-1",
          name: "name-1",
          college: {
            id: 1,
            name: "college-1",
          },
          course: {
            id: 1,
            name: "course-1",
          },
        },
      ],
    };
  },
};
</script>
