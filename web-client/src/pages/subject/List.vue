<template>
  <v-card>
    <v-toolbar flat>
      <v-toolbar-title class="font-weight-bold">Subject List</v-toolbar-title>
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
      <v-btn icon :to="{ name: 'subject-form' }">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-toolbar>
    <v-data-table :headers="headers" :items="items">
      <template v-slot:item.code="{ item }">
        <span class="font-weight-bold text-uppercase">{{ item.code }}</span>
      </template>
      <template v-slot:item.title="{ item }">
        <span class="text-capitalize">{{ item.title }}</span>
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
          text: "Title",
          value: "title",
        },

        {
          text: "Units",
          value: "units",
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
          title: "title-1",
          units: 2,
        },

        {
          code: "code-2",
          title: "title-2",
          units: 3,
        },

        {
          code: "code-3",
          title: "title-3",
          units: 5,
        },
      ],
    };
  },
};
</script>
