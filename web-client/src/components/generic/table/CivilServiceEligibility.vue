<template>
  <v-data-table
    hide-default-footer
    :headers="tableHeaders"
    :items="civilServiceEligibilityLocal"
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
                    label="License Title"
                    outlined
                    v-model="form.licenseTitle"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    label="License Number"
                    outlined
                    v-model="form.licenseNumber"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    label="Rating"
                    outlined
                    v-model="form.rating"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <generic-date-input
                    label="Validity Date"
                    outlined
                    :date.sync="form.validityDate"
                  ></generic-date-input>
                </v-col>
                <v-col cols="12" md="4">
                  <generic-date-input
                    label="Examination Date"
                    outlined
                    :date.sync="form.examinationDate"
                  ></generic-date-input>
                </v-col>
                <v-col cols="12" md="8">
                  <v-text-field
                    label="Examination Place"
                    outlined
                    v-model="form.examinationPlace"
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
    <template v-slot:item.title="{ item }">
      <div class="text-capitalize">
        {{ item.licenseTitle ? item.licenseTitle : "N/A" }}
      </div>
    </template>
    <template v-slot:item.examinationDate="{ item }">
      <div class="text-capitalize">
        {{ item.examinationDate ? formatDate(item.examinationDate) : "N/A" }}
      </div>
    </template>
    <template v-slot:item.examinationPlace="{ item }">
      <div class="text-capitalize">
        {{ item.examinationPlace ? item.examinationPlace : "N/A" }}
      </div>
    </template>
    <template v-slot:item.licenseNumber="{ item }">
      <div class="text-uppercase font-weight-bold">
        {{ item.licenseNumber ? item.licenseNumber : "N/A" }}
      </div>
    </template>
    <template v-slot:item.validityDate="{ item }">
      <div class="text-capitalize">
        {{ item.validityDate ? formatDate(item.validityDate) : "N/A" }}
      </div>
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

const tableHeaders = [
  {
    text: "License Title",
    value: "licenseTitle",
    align: "left"
  },
  {
    text: "License Number",
    value: "licenseNumber"
  },
  {
    text: "Validity Date",
    value: "validityDate"
  },
  {
    text: "Action",
    value: "action"
  }
];

const defaultForm = {
  licenseTitle: "",
  rating: "",
  licenseNumber: "",
  validityDate: null,
  examinationDate: "",
  examinationPlace: ""
};

export default {
  name: "generic-civil-service-eligibility",
  components: { GenericDateInput },

  props: {
    civilServiceEligibility: {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      dialog: false,
      tableHeaders,
      civilServiceEligibilityLocal: [],
      form: Object.assign({}, defaultForm),
      defaultForm
    };
  },

  mixins: [customUtilities],

  computed: {
    isFormValid() {
      return this.form.licenseTitle && this.form.licenseNumber;
    }
  },

  watch: {
    civilServiceEligibility(val) {
      this.$emit("update:civilServiceEligibility", val);
    },
    civilServiceEligibilityLocal(val) {
      this.$emit("update:civilServiceEligibility", val);
    }
  },

  methods: {
    add() {
      if (this.form.licenseTitle && this.form.licenseNumber) {
        this.civilServiceEligibilityLocal = [
          ...this.civilServiceEligibilityLocal,
          this.form
        ];
        this.clearForm();
      }
    },

    remove(row) {
      const position = this.civilServiceEligibilityLocal.indexOf(row);
      this.civilServiceEligibilityLocal = this.civilServiceEligibilityLocal.filter(
        (_, index) => position !== index
      );
    },

    clearForm() {
      this.form = Object.assign({}, this.defaultForm);
    }
  },

  created() {
    this.civilServiceEligibilityLocal = this.civilServiceEligibility;
  }
};
</script>
