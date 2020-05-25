<template>
  <v-card>
    <v-toolbar flat>
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
        <v-icon>mdi-calendar</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
    </v-toolbar>
    <v-data-table :headers="headers"></v-data-table>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        {
          text: "Name",
        },

        {
          text: "Type",
        },

        {
          text: "Date & Time",
        },
      ],
    };
  },
};
</script>
