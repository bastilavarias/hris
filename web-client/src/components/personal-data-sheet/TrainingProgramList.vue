<template>
  <div>
    <div class="d-flex justify-space-between align-center">
      <span class="v-card__subtitle pl-0">Training Programs</span>
      <v-btn color="primary" small @click="isDialogShow = true">
        Add Training Program
      </v-btn>
    </div>
    <v-data-table hide-default-footer :headers="headers"></v-data-table>
    <v-dialog v-model="isDialogShow" width="800">
      <v-card>
        <v-card-title>
          <span>
            Training Program Details
          </span>
          <div class="flex-grow-1"></div>
          <v-btn icon @click="isDialogShow = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-row dense>
            <v-col cols="12">
              <v-text-field outlined label="Title"></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-select outlined label="Year From"></v-select>
            </v-col>
            <v-col cols="12" md="6">
              <v-select outlined label="Year To"></v-select>
            </v-col>
            <v-col cols="12">
              <v-text-field
                outlined
                label="Total Number Of Hours"
                type="number"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field outlined label="Type"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field outlined label="Sponsor"></v-text-field>
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
  name: "personal-data-sheet-training-program-list",

  data() {
    return {
      headers: [
        {
          text: "Company",
        },

        {
          text: "Position",
        },

        {
          text: "Date",
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
