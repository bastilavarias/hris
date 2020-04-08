<template>
  <v-card>
    <v-card-title>
      <generic-back-button
        class-name="mb-5"
        title="Semester Details"
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
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-radio-group
            v-model="form.isCurrent"
            label="Set as current semester?"
          >
            <v-radio label="Yes" :value="true"></v-radio>
            <v-radio label="No" :value="false"></v-radio>
          </v-radio-group>
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
  createSemester,
  getSingleSemester,
  setSemesterError,
  setSemesters,
  updateSemester
} from "../../store/types/semester";
import { setActionName } from "../../store/types/action";
import GenericFormActionButton from "../../components/generic/FormActionButton";
import GenericBackButton from "../../components/generic/BackButton";
import customUtilities from "../../services/customUtilities";

const defaultForm = {
  name: "",
  isCurrent: false
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
      return this.$store.state.semester.error;
    }
  },

  watch: {
    "$store.state.action.name"(name) {
      if (name === `${createSemester}-error`) {
        this.$store.commit(setActionName, "");
        this.isLoading = false;
        return;
      }

      if (name === createSemester) {
        this.form = Object.assign({}, this.defaultForm);
        this.$store.commit(setSemesterError, []);
        this.$store.commit(setActionName, "");
        this.isLoading = false;
        return;
      }

      if (name === updateSemester) {
        this.form = Object.assign({}, this.defaultForm);
        this.$store.commit(setSemesterError, []);
        this.$store.commit(setActionName, "");
        this.$router.push({ name: "semester-list" });
      }
    },

    "$store.state.semester.current"(semester) {
      if (Object.keys(semester).length <= 0)
        return this.$router.push({ name: "semester-list" });
      this.form.name = semester.name;
      this.form.isCurrent = semester.isCurrent === 1;
      this.isLoading = false;
    }
  },

  methods: {
    create() {
      this.$store.dispatch(createSemester, this.form);
      this.isLoading = true;
    },

    update() {
      const semesterId = this.$route.params.semesterId;
      this.$store.dispatch(updateSemester, {
        semesterId,
        details: this.form
      });
      this.isLoading = true;
    }
  },

  created() {
    const operation = this.$route.params.operation;
    if (operation === "update") {
      const semesterId = this.$route.params.semesterId;
      this.operation = operation;
      this.$store.dispatch(getSingleSemester, semesterId);
      this.isLoading = true;
    }
  },

  destroyed() {
    this.$store.commit(setSemesters, []);
    this.$store.commit(setSemesterError, []);
    this.$store.commit(setActionName, "");
  }
};
</script>
