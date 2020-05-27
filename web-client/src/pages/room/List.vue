<template>
  <v-card>
    <v-toolbar flat>
      <v-toolbar-title class="font-weight-bold">Room List</v-toolbar-title>
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
      <v-btn icon :to="{ name: 'room-form' }">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-toolbar>
    <v-data-table :headers="headers" :items="items">
      <template v-slot:item.name="{ item }">
        <span class="text-capitalize">{{ item.name }}</span>
      </template>

      <template v-slot:item.building="{ item }">
        <span class="text-capitalize">{{ item.building.name }}</span>
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
          text: "Name",
          value: "name",
        },

        {
          text: "Building",
          value: "building",
        },

        {
          text: "Actions",
          align: "right",
          value: "actions",
        },
      ],

      items: [
        {
          name: "room-1",
          building: {
            name: "building-1",
          },
        },

        {
          name: "room-2",
          building: {
            name: "building-2",
          },
        },
      ],
    };
  },
};
</script>
