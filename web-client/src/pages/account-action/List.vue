<template>
  <v-card>
    <v-toolbar flat>
      <v-toolbar-title class="font-weight-bold"
        >Account Action List</v-toolbar-title
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
      <v-btn icon :to="{ name: 'account-action-form' }">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-toolbar>
    <v-data-table :headers="headers"></v-data-table>
    <router-view></router-view>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        {
          text: "Text",
        },

        {
          text: "Icon",
        },

        {
          text: "Route Name",
        },

        {
          text: "Actions",
        },
      ],
    };
  },
};
</script>
