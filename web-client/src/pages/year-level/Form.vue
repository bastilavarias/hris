<template>
  <v-card>
    <v-card-title>
      <generic-back-button
        class-name="mb-5"
        title="YearLevel Details"
      ></generic-back-button>
    </v-card-title>
    <v-card-text>
      <v-row dense>
        <v-col cols="12">
          <v-text-field
            label="Name"
            v-model="form.name"
            outlined
            :error="hasError(error.name)"
            :error-messages="error.name"
            autofocus
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
  createYearLevel,
  getSingleYearLevel,
  setYearLevelError,
  setYearLevels,
  updateYearLevel
} from "../../store/types/yearLevel";
import { setActionName } from "../../store/types/action";
import GenericFormActionButton from "../../components/generic/FormActionButton";
import GenericBackButton from "../../components/generic/BackButton";
import customUtilities from "../../services/customUtilities";

const defaultForm = {
  name: ""
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
      return this.form.name;
    },

    error() {
      return this.$store.state.yearLevel.error;
    }
  },

  watch: {
    "$store.state.action.name"(name) {
      if (name === `${createYearLevel}-error`) {
        this.$store.commit(setActionName, "");
        this.isLoading = false;
        return;
      }

      if (name === `${updateYearLevel}-error`) {
        this.$store.commit(setActionName, "");
        this.isLoading = false;
        return;
      }

      if (name === createYearLevel) {
        this.form = Object.assign({}, this.defaultForm);
        this.$store.commit(setYearLevelError, []);
        this.$store.commit(setActionName, "");
        this.isLoading = false;
        return;
      }

      if (name === updateYearLevel) {
        this.form = Object.assign({}, this.defaultForm);
        this.$store.commit(setYearLevelError, []);
        this.$store.commit(setActionName, "");
        this.$router.push({ name: "year-level-list" });
      }
    },

    "$store.state.yearLevel.current"(yearLevel) {
      if (Object.keys(yearLevel).length <= 0)
        return this.$router.push({ name: "year-level-list" });
      this.form.name = yearLevel.name;
      this.isLoading = false;
    }
  },

  methods: {
    create() {
      this.$store.dispatch(createYearLevel, this.form);
      this.isLoading = true;
    },

    update() {
      const yearLevelId = this.$route.params.yearLevelId;
      this.$store.dispatch(updateYearLevel, {
        yearLevelId,
        details: this.form
      });
      this.isLoading = true;
    }
  },

  created() {
    const operation = this.$route.params.operation;
    if (operation === "update") {
      const yearLevelId = this.$route.params.yearLevelId;
      this.operation = operation;
      this.$store.dispatch(getSingleYearLevel, yearLevelId);
      this.isLoading = true;
    }
  },

  destroyed() {
    this.$store.commit(setYearLevels, []);
    this.$store.commit(setYearLevelError, []);
    this.$store.commit(setActionName, "");
  }
};
</script>
