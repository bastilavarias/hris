<template>
  <v-dialog width="1000" v-model="isDepartmentFormDialogShow">
    <v-card>
      <v-card-title class="font-weight-bold">
        <span>Department Form</span>
        <div class="flex-grow-1"></div>
        <v-btn icon @click="isDepartmentFormDialogShow = false">
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
              label="Head"
              outlined
              readonly
              @click="isSearchEmployeeDialogShow = true"
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
      :is-show.sync="isSearchEmployeeDialogShow"
      title="Employees"
      :items="employees"
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
import CustomFormSubtitle from "../../components/custom/CustomFormSubtitle";
import GenericSearchDialog from "../../components/generic/GenericSearchDialog";
import customUtilities from "../../common/customUtilities";
export default {
  components: { GenericSearchDialog, CustomFormSubtitle },

  data() {
    return {
      isDepartmentFormDialogShow: false,
      isSearchEmployeeDialogShow: false,
      employees: [
        {
          employeeNumber: "Employee-1",
          profile: {
            firstName: "Employee-1",
            middleName: "Employee-1",
            lastName: "Employee-1",
            extension: "Employee-1",
          },
        },

        {
          employeeNumber: "Employee-2",
          profile: {
            firstName: "Employee-2",
            middleName: "Employee-2",
            lastName: "Employee-2",
            extension: "Employee-2",
          },
        },
      ],
    };
  },

  mixins: [customUtilities],

  watch: {
    isDepartmentFormDialogShow(isDepartmentFormDialogShow) {
      if (!isDepartmentFormDialogShow)
        return this.$router.push({ name: "department-list" });
    },
  },

  mounted() {
    this.isDepartmentFormDialogShow = true;
  },
};
</script>
