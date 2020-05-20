<template>
  <v-list color="white">
    <v-list-item three-line>
      <v-list-item-avatar>
        <v-img
          src="../../assets/logo.png"
          lazy-src="../../assets/logo.png"
        ></v-img>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="font-weight-bold"
          >Sebastian C. Lavarias</v-list-item-title
        >
        <v-list-item-subtitle class="font-weight-bold"
          >38-2020-0000
        </v-list-item-subtitle>
        <v-list-item-subtitle>Human Resource Staff </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>
    <v-subheader>Available Actions</v-subheader>
    <v-container class="py-0">
      <v-text-field
        outlined
        single-line
        placeholder="Search actions"
        dense
      ></v-text-field>
    </v-container>
    <template v-for="(action, index) in actions">
      <v-list-item
        :key="index"
        :to="action.to"
        active-class="primary--text active-action-item"
      >
        <v-list-item-icon>
          <v-icon>{{ action.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-subtitle class="font-weight-bold black--text">{{
          action.text
        }}</v-list-item-subtitle>
      </v-list-item>
    </template>
  </v-list>
</template>
<script>
export default {
  name: "navigation-drawer-content",

  data() {
    return {
      actions: [
        {
          text: "Employee Management",
          icon: "mdi-account-tie",
          to: { name: "employee-list" },
        },

        {
          text: "Department Management",
          icon: "mdi-account-group",
          to: { name: "department-list" },
        },

        {
          text: "Designation Management",
          icon: "mdi-account-box",
          to: { name: "designation-list" },
        },

        {
          text: "Faculty Teaching Assignment",
          icon: "mdi-calendar-multiple-check",
          to: { name: "faculty-teaching-assignment-adder" },
        },

        {
          text: "Personal Data Sheet",
          icon: "mdi-file-account",
          to: { name: "personal-data-sheet" },
        },

        {
          text: "Employee Schedule Tagger",
          icon: "mdi-calendar-account",
          to: { name: "employee-schedule-tagger" },
        },

        {
          text: "Subject Management",
          icon: "mdi-text-subject",
          to: { name: "subject-list" },
        },

        {
          text: "College Management",
          icon: "mdi-school",
          to: { name: "college-list" },
        },

        {
          text: "Course Management",
          icon: "mdi-book-multiple",
          to: { name: "course-list" },
        },

        {
          text: "Section Management",
          icon: "mdi-google-classroom",
          to: { name: "section-list" },
        },

        {
          text: "Building Management",
          icon: "mdi-domain",
          to: { name: "building-list" },
        },

        {
          text: "Room Management",
          icon: "mdi-door",
          to: { name: "room-list" },
        },

        {
          text: "Semester Management",
          icon: "mdi-chair-school",
          to: { name: "semester-list" },
        },

        {
          text: "School Year Management",
          icon: "mdi-calendar-range",
          to: { name: "school-year-list" },
        },

        {
          text: "Year Level Management",
          icon: "mdi-filter-variant",
          to: { name: "year-level-list" },
        },
      ],
    };
  },
};
</script>

<style scoped>
.active-action-item {
  border-right: 0.2rem solid #327726;
}
</style>
