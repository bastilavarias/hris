<template>
  <v-card>
    <v-card-title>
      <generic-back-button
        class-name="mb-5"
        title="College Details"
      ></generic-back-button>
    </v-card-title>
    <v-card-text>
      <v-row dense>
        <v-col cols="12">
          <v-text-field
            label="Custom ID"
            v-model="form.customId"
            :readonly="operation === 'update'"
            outlined
            :error="hasError(error.customId)"
            :error-messages="error.customId"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            label="Name"
            v-model="form.name"
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            label="Description"
            v-model="form.description"
            outlined
          ></v-text-field>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <generic-form-action-button
        :operation="operation"
        :create="create"
        :update="update"
        :disabled="!isFormValid"
        :is-loading="isLoading"
      ></generic-form-action-button>
    </v-card-actions>
  </v-card>
</template>

<script>
import GenericCardBackButton from "../../components/generic/CardBackButton";
import {
  createCollege,
  getSingleCollege,
  setCollegeError,
  setColleges,
  updateCollege
} from "../../store/types/college";
import { setActionName } from "../../store/types/action";
import GenericFormActionButton from "../../components/generic/FormActionButton";
import GenericBackButton from "../../components/generic/BackButton";
import customUtilities from "../../services/customUtilities";

const defaultForm = {
  customId: "",
  name: "",
  description: ""
};

export default {
  components: {
    GenericBackButton,
    GenericFormActionButton,
    GenericCardBackButton
  },

  data() {
    return {
      form: Object.assign({}, defaultForm),
      defaultForm,
      operation: "create",
      isLoading: false
    };
  },

  mixins: [customUtilities],

  computed: {
    isFormValid() {
      return this.form.customId && this.form.name;
    },

    error() {
      return this.$store.state.college.error;
    }
  },

  watch: {
    "$store.state.action.name"(name) {
      if (name === `${createCollege}-error`) {
        this.$store.commit(setActionName, "");
        this.isLoading = false;
        return;
      }

      if (name === createCollege) {
        this.form = Object.assign({}, this.defaultForm);
        this.$store.commit(setCollegeError, []);
        this.$store.commit(setActionName, "");
        this.isLoading = false;
        return;
      }

      if (name === updateCollege) {
        this.form = Object.assign({}, this.defaultForm);
        this.$store.commit(setCollegeError, []);
        this.$store.commit(setActionName, "");
        this.$router.push({ name: "college-list" });
      }
    },

    "$store.state.college.current"(college) {
      if (Object.keys(college).length <= 0)
        return this.$router.push({ name: "college-list" });
      this.form.customId = college.customId;
      this.form.name = college.name;
      this.form.description = college.description;
      this.isLoading = false;
    }
  },

  methods: {
    create() {
      this.$store.dispatch(createCollege, this.form);
      this.isLoading = true;
    },

    update() {
      const collegeId = this.$route.params.collegeId;
      this.$store.dispatch(updateCollege, {
        collegeId,
        details: this.form
      });
      this.isLoading = true;
    }
  },

  created() {
    const operation = this.$route.params.operation;
    if (operation === "update") {
      const collegeId = this.$route.params.collegeId;
      this.operation = operation;
      this.$store.dispatch(getSingleCollege, collegeId);
      this.isLoading = true;
    }
  },

  destroyed() {
    this.$store.commit(setColleges, []);
    this.$store.commit(setCollegeError, []);
    this.$store.commit(setActionName, "");
  }
};
</script>
