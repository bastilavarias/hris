<template>
  <v-card>
    <v-card-title class="font-weight-bold">
      Salary Form
    </v-card-title>
    <v-card-text>
      <v-row dense>
        <v-col cols="12">
          <v-text-field label="Title" outlined></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field label="Description" outlined></v-text-field>
        </v-col>
        <v-col cols="12">
          <custom-form-subtitle>
            <span>
              Salary Grade Table
            </span>
            <div class="flex-grow-1"></div>
            <v-btn color="primary">
              <v-icon class="mr-1">
                mdi-plus
              </v-icon>
              <span>Add Salary Grade</span>
            </v-btn>
          </custom-form-subtitle>

          <v-data-table
            :headers="salaryGradeTableHeaders"
            hide-default-footer
            :items="salaryGradeItems"
          >
          </v-data-table>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" block>
        Submit
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import CustomFormSubtitle from "../../components/CustomFormSubtitle";
export default {
  components: { CustomFormSubtitle },

  data() {
    return {
      salaryGradeTableHeaders: [
        {
          text: "Grade",
          value: "grade",
        },

        {
          text: "Step Increments",
          value: "stepIncrementCount",
        },

        {
          text: "Actions",
          value: "actions",
        },
      ],

      salaryGradeItems: [
        {
          grade: "1",
          stepIncrementCount: 8,
          stepIncrements: [
            {
              step: 1,
              salary: 10000,
            },
          ],
        },
      ],
    };
  },
};
</script>
