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
    <template v-for="(action, index) in actions">
      <v-list-item :key="index" :to="action.to" active-class="primary--text">
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
          icon: "mdi-account",
          to: { name: "employee-list" },
        },

        {
          text: "Department Management",
          icon: "mdi-account",
          to: { name: "department-list" },
        },
      ],
    };
  },
};
</script>
