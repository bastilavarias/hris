<template>
  <div>
    <div class="d-flex justify-space-between align-center">
      <span class="v-card__subtitle pl-0">Children Information</span>
      <v-btn color="primary" small @click="isDialogShow = true">
        Add Children
      </v-btn>
    </div>
    <v-data-table hide-default-footer :headers="headers"></v-data-table>
    <v-dialog v-model="isDialogShow" width="500">
      <v-card>
        <v-card-title>
          <span>
            Child Information
          </span>
          <div class="flex-grow-1"></div>
          <v-btn icon @click="isDialogShow = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-row dense>
            <v-col cols="12">
              <v-text-field outlined label="Name"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field outlined label="Birth Date"></v-text-field>
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
  name: "personal-data-sheet-child-information-list",

  data() {
    return {
      headers: [
        {
          text: "Name",
        },
        {
          text: "Birth Date",
        },
      ],

      isDialogShow: false,
    };
  },
};
</script>
