<template>
  <v-dialog width="1000" v-model="isCollegeFormDialogShow">
    <v-card>
      <v-card-title class="font-weight-bold">
        <span>Personal Leave List</span>
        <div class="flex-grow-1"></div>
        <v-btn icon @click="isCollegeFormDialogShow = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-row dense>
          <v-col cols="12">
            <v-text-field label="ID" outlined></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field label="Name" outlined></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field label="Description" outlined></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-autocomplete
              label="Dean"
              outlined
              readonly
              @click="isSearchFacultyDialogShow = true"
            ></v-autocomplete>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" block>
          Submit
        </v-btn>
      </v-card-actions>
    </v-card>
    <generic-search-dialog
      :is-show.sync="isSearchFacultyDialogShow"
      title="Faculties"
      :items="faculties"
    >
      <template v-slot:item-title="{ item }">
        <span class="text-capitalize">{{ formatFullName(item.profile) }}</span>
      </template>

      <template v-slot:item-subtitle-top="{ item }">
        <span class="text-uppercase font-weight-bold">{{
          item.employeeNumber
        }}</span>
      </template>
    </generic-search-dialog>
  </v-dialog>
</template>

<script>
import GenericSearchDialog from "../../components/generic/GenericSearchDialog";
import customUtilities from "../../common/customUtilities";
export default {
  components: { GenericSearchDialog },
  data() {
    return {
      isCollegeFormDialogShow: false,
      isSearchFacultyDialogShow: false,
      faculties: [
        {
          employeeNumber: "Faculty-1",
          profile: {
            firstName: "Faculty-1",
            middleName: "Faculty-1",
            lastName: "Faculty-1",
            extension: "Faculty-1",
          },
        },

        {
          employeeNumber: "Faculty-2",
          profile: {
            firstName: "Faculty-2",
            middleName: "Faculty-2",
            lastName: "Faculty-2",
            extension: "Faculty-2",
          },
        },
      ],
    };
  },

  mixins: [customUtilities],

  watch: {
    isCollegeFormDialogShow(isCollegeFormDialogShow) {
      if (!isCollegeFormDialogShow)
        return this.$router.push({ name: "college-list" });
    },
  },

  mounted() {
    this.isCollegeFormDialogShow = true;
  },
};
</script>
