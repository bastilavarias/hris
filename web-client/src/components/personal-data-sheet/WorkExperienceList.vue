<template>
  <div>
    <div class="d-flex justify-space-between align-center">
      <span class="v-card__subtitle pl-0">Work Experience List</span>
      <v-btn color="primary" small @click="isDialogShow = true">
        Add Work Experience
      </v-btn>
    </div>
    <v-data-table hide-default-footer :headers="headers"></v-data-table>
    <v-dialog v-model="isDialogShow" width="800">
      <v-card>
        <v-card-title>
          <span>
            Work Experience Details
          </span>
          <div class="flex-grow-1"></div>
          <v-btn icon @click="isDialogShow = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-row dense>
            <v-col cols="12" md="8">
              <v-text-field outlined label="Company"></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field outlined label="Position"></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field outlined label="Salary Grade"></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field outlined label="Step Increment"></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field outlined label="Monthly Salary"></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-select outlined label="Year From"></v-select>
            </v-col>
            <v-col cols="12" md="6">
              <v-select outlined label="Year To"></v-select>
            </v-col>
            <v-col cols="12" md="6">
              <v-select outlined label="Appointment Status"></v-select>
            </v-col>
            <v-col cols="12" md="6">
              <v-radio-group label="Is in Government Service" row>
                <v-radio label="Yes"></v-radio>
                <v-radio label="No"></v-radio>
              </v-radio-group>
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
  name: "personal-data-sheet-work-experience-list",

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
