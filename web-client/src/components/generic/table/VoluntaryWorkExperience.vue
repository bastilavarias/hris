<template>
  <v-data-table
    hide-default-footer
    :headers="tableHeaders"
    :items="voluntaryWorkExperiencesLocal"
  >
    <template v-slot:top>
      <v-row no-gutters>
        <div class="flex-grow-1"></div>
        <v-dialog v-model="dialog" max-width="800">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" v-on="on">
              Add Information
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span>License Information</span>
            </v-card-title>
            <v-card-text>
              <v-row dense>
                <v-col cols="12" md="8">
                  <v-text-field
                    label="Company"
                    outlined
                    v-model="form.companyName"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    label="Position"
                    outlined
                    v-model="form.position"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="12">
                  <v-text-field
                    label="Address"
                    outlined
                    v-model="form.address"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <generic-year-selection
                    label="From"
                    outlined
                    :year.sync="form.yearFrom"
                  ></generic-year-selection>
                </v-col>
                <v-col cols="12" md="6">
                  <generic-year-selection
                    label="To"
                    outlined
                    :year.sync="form.yearTo"
                  ></generic-year-selection>
                </v-col>
                <v-col cols="12" md="12">
                  <v-text-field
                    type="number"
                    label="Total Number Of Hours"
                    outlined
                    v-model="form.hoursNumber"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text @click="dialog = false">Cancel</v-btn>
              <v-btn color="primary" :disabled="!isFormValid" @click="add"
                >Save</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </template>
    <template v-slot:item.companyName="{ item }">
      <span class="text-capitalize">{{
        item.companyName ? item.companyName : "N/A"
      }}</span>
    </template>
    <template v-slot:item.position="{ item }">
      <span class="text-capitalize">{{
        item.position ? item.position : "N/A"
      }}</span>
    </template>
    <template v-slot:item.address="{ item }">
      <span class="text-capitalize">{{
        item.address ? item.address : "N/A"
      }}</span>
    </template>
    <template v-slot:item.date="{ item }">
      {{ item.yearFrom ? item.yearFrom : "N/A" }} -
      {{ item.yearTo ? item.yearTo : "N/A" }}
    </template>
    <template v-slot:item.isFullTime="{ item }">
      {{ item.isFullTime ? "Yes" : "No" }}
    </template>
    <template v-slot:item.isGovernmentService="{ item }">
      {{ item.isGovernmentService ? "Yes" : "No" }}
    </template>
    <template v-slot:item.action="{ item }">
      <v-btn icon @click="remove(item)">
        <v-icon>mdi-trash-can</v-icon>
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import GenericDateInput from "../DateInput";
import customUtilities from "../../../services/customUtilities";
import GenericYearSelection from "../selection/Year";

const tableHeaders = [
  {
    text: "Company",
    value: "companyName",
    align: "left"
  },
  {
    text: "Position",
    value: "position"
  },
  {
    text: "Address",
    value: "address"
  },
  {
    text: "Date",
    value: "date"
  },
  { text: "Action", value: "action", align: "right" }
];

const defaultForm = {
  companyName: "",
  position: "",
  address: "",
  yearFrom: null,
  yearTo: null,
  hoursNumber: 0
};

export default {
  name: "generic-voluntary-work-experience",
  components: { GenericYearSelection, GenericDateInput },

  props: {
    voluntaryWorkExperiences: {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      dialog: false,
      tableHeaders,
      voluntaryWorkExperiencesLocal: [],
      form: Object.assign({}, defaultForm),
      defaultForm
    };
  },

  mixins: [customUtilities],

  computed: {
    isFormValid() {
      return (
        this.form.companyName &&
        this.form.address &&
        this.form.position &&
        this.form.yearFrom &&
        this.form.yearTo
      );
    }
  },

  watch: {
    voluntaryWorkExperiences(val) {
      this.$emit("update:voluntaryWorkExperiences", val);
    },
    voluntaryWorkExperiencesLocal(val) {
      this.$emit("update:voluntaryWorkExperiences", val);
    }
  },

  methods: {
    add() {
      if (
        this.form.companyName &&
        this.form.address &&
        this.form.position &&
        this.form.yearFrom &&
        this.form.yearTo
      ) {
        this.voluntaryWorkExperiencesLocal = [
          ...this.voluntaryWorkExperiencesLocal,
          this.form
        ];
        this.clearForm();
      }
    },

    remove(row) {
      const position = this.voluntaryWorkExperiencesLocal.indexOf(row);
      this.voluntaryWorkExperiencesLocal = this.voluntaryWorkExperiencesLocal.filter(
        (_, index) => position !== index
      );
    },

    clearForm() {
      this.form = Object.assign({}, this.defaultForm);
    }
  },

  created() {
    this.voluntaryWorkExperiencesLocal = this.voluntaryWorkExperiences;
  }
};
</script>
