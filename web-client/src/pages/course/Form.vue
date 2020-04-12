<template>
  <v-card>
    <v-card-title>
      <generic-back-button
        class-name="mb-5"
        title="Course Details"
      ></generic-back-button>
    </v-card-title>
    <v-card-text>
      <v-row dense>
        <v-col cols="12">
          <v-text-field
            label="Code"
            v-model="form.code"
            :readonly="operation === 'update'"
            outlined
            :error="hasError(error.code)"
            :error-messages="error.code"
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
        <v-col cols="12">
          <generic-search-dialog
            :search-options="searchOptions"
            :search-option.sync="searchOption"
            :search-value.sync="searchValue"
            :action="searchColleges"
            :items="colleges"
            :is-loading="isSearchCollegeStart"
            label="College"
            title="Search College"
            item-value="id"
            :select-value.sync="form.college"
          >
            <template v-slot:select-selection="{ item }">
              <span class="text-capitalize">
                {{ item.name }}
              </span>
            </template>
            <template v-slot:list-item-subtitle-top="{ item }">
              <span class="font-weight-bold text-uppercase">
                {{ item.customId }}
              </span>
            </template>
            <template v-slot:list-item-title="{ item }">
              <span class="text-capitalize"> {{ item.name }} </span>
            </template>
          </generic-search-dialog>
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
  createCourse,
  getSingleCourse,
  setCourseError,
  setCourses,
  updateCourse
} from "../../store/types/course";
import { setActionName } from "../../store/types/action";
import GenericFormActionButton from "../../components/generic/FormActionButton";
import GenericBackButton from "../../components/generic/BackButton";
import customUtilities from "../../services/customUtilities";
import GenericCollegeSelection from "../../components/generic/selection/College";
import {
  getAllColleges,
  searchColleges,
  setColleges
} from "../../store/types/college";
import GenericSearchDialog from "../../components/generic/SearchDialog";

const defaultForm = {
  code: "",
  name: "",
  description: "",
  college: null
};

const searchOptions = ["all", "custom ID", "name"];

export default {
  components: {
    GenericSearchDialog,
    GenericCollegeSelection,
    GenericBackButton,
    GenericFormActionButton,
    GenericCardBackButton
  },

  data() {
    return {
      form: Object.assign({}, defaultForm),
      defaultForm,
      operation: "create",
      isLoading: false,
      searchOption: "all",
      searchOptions,
      searchValue: "",
      isSearchCollegeStart: false
    };
  },

  mixins: [customUtilities],

  computed: {
    isFormValid() {
      return (
        this.form.code && this.form.name && this.isObject(this.form.college)
      );
    },

    error() {
      return this.$store.state.course.error;
    },

    colleges() {
      return this.$store.state.college.list;
    }
  },

  watch: {
    "$store.state.action.name"(name) {
      if (name === `${createCourse}-error`) {
        this.$store.commit(setActionName, "");
        this.isLoading = false;
        return;
      }

      if (name === createCourse) {
        this.form = Object.assign({}, this.defaultForm);
        this.$store.commit(setCourseError, []);
        this.$store.commit(setActionName, "");
        this.isLoading = false;
        return;
      }

      if (name === updateCourse) {
        this.form = Object.assign({}, this.defaultForm);
        this.$store.commit(setCourseError, []);
        this.$store.commit(setActionName, "");
        this.$router.push({ name: "course-list" });
        return;
      }

      if (name === searchColleges || name === getAllColleges) {
        this.isSearchCollegeStart = false;
        this.$store.commit(setActionName, "");
      }
    },

    "$store.state.course.current"(course) {
      if (Object.keys(course).length <= 0)
        return this.$router.push({ name: "course-list" });
      this.form.code = course.code;
      this.form.name = course.name;
      this.form.description = course.description;
      this.form.college = course.college;
      this.isLoading = false;
    },

    searchOption(opt) {
      if (opt === "all") return this.$store.dispatch(getAllColleges);
    }
  },

  methods: {
    create() {
      const params = {
        code: this.form.code,
        name: this.form.name,
        description: this.form.description,
        collegeId: this.form.college.id
      };
      this.$store.dispatch(createCourse, params);
      this.isLoading = true;
    },

    update() {
      const courseId = this.$route.params.courseId;
      const details = {
        code: this.form.code,
        name: this.form.name,
        description: this.form.description,
        collegeId: this.form.college.id
      };
      this.$store.dispatch(updateCourse, {
        courseId,
        details
      });
      this.isLoading = true;
    },

    searchColleges() {
      this.isSearchCollegeStart = true;
      if (this.searchOption === "all")
        return this.$store.dispatch(getAllColleges);
      if (
        this.searchValue.trim() &&
        ["custom ID", "name"].includes(this.searchOption)
      ) {
        const searchConfig = {
          option: this.searchOption,
          value: this.searchValue
        };
        return this.$store.dispatch(searchColleges, searchConfig);
      }
      this.isSearchCollegeStart = false;
      return this.$store.commit(setColleges, []);
    }
  },

  created() {
    const operation = this.$route.params.operation;
    if (operation === "update") {
      const courseId = this.$route.params.courseId;
      this.operation = operation;
      this.$store.dispatch(getSingleCourse, courseId);
      this.isLoading = true;
    }
  },

  destroyed() {
    this.$store.commit(setCourses, []);
    this.$store.commit(setCourseError, []);
    this.$store.commit(setActionName, "");
  }
};
</script>
