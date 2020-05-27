<template>
  <v-dialog width="1000" v-model="isDesignationFormDialogShow">
    <v-card>
      <v-card-title class="font-weight-bold">
        <span>Designation Form</span>
        <div class="flex-grow-1"></div>
        <v-btn icon @click="isDesignationFormDialogShow = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-row dense>
          <v-col cols="12">
            <v-text-field label="Name" outlined></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field label="Description" outlined></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-autocomplete
              label="Salary Grade"
              outlined
              readonly
              @click="isSearchSalaryGradeDialogShow = true"
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
      :is-show.sync="isSearchSalaryGradeDialogShow"
      title="Salary Grades"
      :items="salaryGrades"
    >
      <template v-slot:item-title="{ item }">
        <span class="text-capitalize">{{ item.name }}</span>
      </template>

      <template v-slot:item-subtitle-bottom="{ item }">
        <span class="text-capitalize">{{ item.salaryGradeTable.name }}</span>
      </template>
    </generic-search-dialog>
  </v-dialog>
</template>

<script>
import CustomFormSubtitle from "../../components/custom/CustomFormSubtitle";
import GenericSearchDialog from "../../components/generic/GenericSearchDialog";
export default {
  components: { GenericSearchDialog, CustomFormSubtitle },

  data() {
    return {
      isDesignationFormDialogShow: false,
      isSearchSalaryGradeDialogShow: false,
      salaryGrades: [
        {
          name: "Grade 1",
          salaryGradeTable: {
            name: "2020SalaryGradeTable",
          },
        },

        {
          name: "Grade 2",
          salaryGradeTable: {
            name: "2020SalaryGradeTable",
          },
        },
      ],
    };
  },

  watch: {
    isDesignationFormDialogShow(isDesignationFormDialogShow) {
      if (!isDesignationFormDialogShow)
        return this.$router.push({ name: "designation-list" });
    },
  },

  mounted() {
    this.isDesignationFormDialogShow = true;
  },
};
</script>
