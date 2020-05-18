<template>
  <div>
    <div class="d-flex justify-space-between align-center">
      <span class="v-card__subtitle pl-0">Civil Service List</span>
      <v-btn color="primary" small @click="isDialogShow = true">
        Add Civil Service
      </v-btn>
    </div>
    <v-data-table hide-default-footer :headers="headers"></v-data-table>
    <v-dialog v-model="isDialogShow" width="800">
      <v-card>
        <v-card-title>
          <span>
            Civil Service Details
          </span>
          <div class="flex-grow-1"></div>
          <v-btn icon @click="isDialogShow = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-row dense>
            <v-col cols="12" md="8">
              <v-text-field outlined label="Title"></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field outlined label="Number"></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field outlined label="Rating"></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-select outlined label="Validity Date"></v-select>
            </v-col>
            <v-col cols="12" md="4">
              <v-select outlined label="Examination Date"></v-select>
            </v-col>
            <v-col cols="12" md="8">
              <v-text-field outlined label="Examination Place"></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" block>Add</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "personal-data-sheet-civil-service-list",

  data() {
    return {
      headers: [
        {
          text: "Title",
        },

        {
          text: "Number",
        },

        {
          text: "Validity Date",
        },

        {
          text: "Actions",
        },
      ],

      isDialogShow: false,
    };
  },
};
</script>
