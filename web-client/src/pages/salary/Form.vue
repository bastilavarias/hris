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
          <v-toolbar flat>
            <v-toolbar-title>
              <custom-form-subtitle>Salary Grade Table</custom-form-subtitle>
            </v-toolbar-title>
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
            <v-btn icon @click="isSalaryGradeFormDialogShow = true">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
            <v-btn icon @click="isSearchSalaryGradeDialogShow = true">
              <v-icon>mdi-application-import</v-icon>
            </v-btn>
          </v-toolbar>
          <v-data-iterator :items="salaryGradeItems">
            <template v-slot:default="props">
              <v-row dense>
                <template v-for="(salaryGradeItem, index) in props.items">
                  <v-col cols="6" md="2" :key="index">
                    <v-card :elevation="20">
                      <v-card-title>
                        <span>Grade {{ salaryGradeItem.grade }}</span>
                        <div class="flex-grow-1"></div>
                        <v-btn icon>
                          <v-icon>mdi-dots-vertical</v-icon>
                        </v-btn>
                      </v-card-title>
                      <v-list>
                        <template
                          v-for="(stepIncrement,
                          index2) in salaryGradeItem.stepIncrements"
                        >
                          <v-list-item :key="index2">
                            <v-list-item-content
                              >Step
                              {{ stepIncrement.step }}:</v-list-item-content
                            >
                            <v-list-item-content class="align-end"
                              >&#8369;
                              {{ stepIncrement.salary }}</v-list-item-content
                            >
                          </v-list-item>
                        </template>
                      </v-list>
                    </v-card>
                  </v-col>
                </template>
              </v-row>
            </template>
          </v-data-iterator>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" block>
        Submit
      </v-btn>
    </v-card-actions>
    <v-dialog width="800" v-model="isSalaryGradeFormDialogShow">
      <v-card>
        <v-card-title class="font-weight-bold">
          <span>Salary Grade Form</span>
          <div class="flex-grow-1"></div>
          <v-btn icon @click="isTimeDateRangeDialogShow = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-row dense>
            <v-col cols="12">
              <v-text-field label="Grade" outlined></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field label="Step 1" outlined></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field label="Step 2" outlined></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field label="Step 3" outlined></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field label="Step 4" outlined></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field label="Step 5" outlined></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" block>Add </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <generic-search-dialog
      :is-show.sync="isSearchSalaryGradeDialogShow"
      title="Salary Grades"
      :items="[]"
    ></generic-search-dialog>
  </v-card>
</template>

<script>
import CustomFormSubtitle from "../../components/custom/CustomFormSubtitle";
import GenericSearchDialog from "../../components/generic/GenericSearchDialog";
export default {
  components: { GenericSearchDialog, CustomFormSubtitle },

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
          grade: 1,
          stepIncrements: [
            {
              step: 1,
              salary: 10000,
            },

            {
              step: 2,
              salary: 10000,
            },

            {
              step: 3,
              salary: 10000,
            },

            {
              step: 4,
              salary: 10000,
            },

            {
              step: 5,
              salary: 10000,
            },
          ],
        },
      ],

      isSalaryGradeFormDialogShow: false,
      isSearchSalaryGradeDialogShow: false,
    };
  },
};
</script>
