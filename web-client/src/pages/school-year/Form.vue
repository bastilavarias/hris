<template>
  <v-card>
    <v-card-title>
      <div class="font-weight-bold">School Year Setting</div>
    </v-card-title>
    <v-card-text>
      <v-row dense>
        <v-col cols="12" md="6">
          <generic-year-selection
            outlined
            label="Start Year"
            :year.sync="form.startYear"
          ></generic-year-selection>
        </v-col>
        <v-col cols="12" md="6">
          <generic-year-selection
            outlined
            label="End Year"
            :year.sync="form.endYear"
          ></generic-year-selection>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-btn color="secondary" block :loading="isLoading" @click="update"
        >Update</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
import GenericCardBackButton from "../../components/generic/CardBackButton";
import {
  createSchoolYear,
  getCurrentSchoolYear,
  getSingleSchoolYear,
  setSchoolYearError,
  setSchoolYears,
  updateSchoolYear
} from "../../store/types/schoolYear";
import { setActionName } from "../../store/types/action";
import GenericFormActionButton from "../../components/generic/FormActionButton";
import GenericBackButton from "../../components/generic/BackButton";
import customUtilities from "../../services/customUtilities";
import GenericYearSelection from "../../components/selection/Year";

const defaultForm = {
  startYear: null,
  endYear: null
};

export default {
  components: {
    GenericYearSelection,
    GenericBackButton,
    GenericFormActionButton,
    GenericCardBackButton
  },

  data() {
    return {
      form: Object.assign({}, defaultForm),
      defaultForm,
      isLoading: false
    };
  },

  mixins: [customUtilities],

  computed: {
    // isFormValid() {
    //   return this.form.name;
    // },
    // error() {
    //   return this.$store.state.schoolYear.error;
    // }
  },

  watch: {
    "$store.state.schoolYear.current"(schoolYear) {
      if (Object.keys(schoolYear).length > 0) {
        this.form.startYear = schoolYear.startYear;
        this.form.endYear = schoolYear.endYear;
        this.isLoading = false;
      }
    },

    "$store.state.action.name"(name) {
      if (name === updateSchoolYear) {
        this.isLoading = false;
        this.$store.commit(setActionName, "");
      }
    }
  },

  methods: {
    update() {
      this.$store.dispatch(updateSchoolYear, this.form);
      this.isLoading = true;
    }
  },

  created() {
    this.$store.dispatch(getCurrentSchoolYear);
    this.isLoading = true;
  },

  destroyed() {
    this.$store.commit(setActionName, "");
  }
};
</script>
