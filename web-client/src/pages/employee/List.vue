<template>
  <v-card>
    <v-card-title>
      <span>Employee List</span>
      <div class="flex-grow-1"></div>
      <v-btn icon>
        <v-icon>mdi-sort</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-subtitle>Lorem ipsum dolor sit amet.</v-card-subtitle>
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
      ],
    };
  },
};
</script>
