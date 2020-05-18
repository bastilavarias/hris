<template>
  <div>
    <div class="d-flex justify-space-between align-center">
      <span class="v-card__subtitle pl-0">Education Background</span>
      <v-btn color="primary" small @click="isDialogShow = true">
        Add Education
      </v-btn>
    </div>
    <v-data-table hide-default-footer :headers="headers"></v-data-table>
    <v-dialog v-model="isDialogShow" width="800">
      <v-card>
        <v-card-title>
          <span>
            Education Background
          </span>
          <div class="flex-grow-1"></div>
          <v-btn icon @click="isDialogShow = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-row dense>
            <v-col cols="12" md="4">
              <v-select outlined label="Level"></v-select>
            </v-col>
            <v-col cols="12" md="8">
              <v-text-field outlined label="Degree"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field outlined label="School Name"></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-select outlined label="Year From"></v-select>
            </v-col>
            <v-col cols="12" md="6">
              <v-select outlined label="Year To"></v-select>
            </v-col>
            <v-col cols="12">
              <v-select outlined label="Year Graduated"></v-select>
            </v-col>
            <v-col cols="12">
              <v-text-field outlined label="Recognition"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field outlined label="Scholarship"></v-text-field>
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
  name: "personal-data-sheet-education-list",

  data() {
    return {
      headers: [
        {
          text: "Level",
        },

        {
          text: "School Name",
        },

        {
          text: "Degree",
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
