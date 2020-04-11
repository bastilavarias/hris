<template>
  <v-card>
    <v-card-title>
      <generic-back-button
        class-name="mb-5"
        title="Section Details"
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
        <v-col cols="12" md="8">
          <v-text-field
            label="Description"
            v-model="form.description"
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-select
            label="Year Level"
            outlined
            v-model="form.yearLevelId"
            :items="yearLevels"
            item-value="id"
          >
            <template v-slot:item="{ item }">
              <span class="text-capitalize">{{ item.name }}</span>
            </template>
            <template v-slot:selection="{ item }">
              <span class="text-capitalize">{{ item.name }}</span>
            </template>
          </v-select>
        </v-col>
        <v-col cols="12">
          <generic-search-dialog
            :search-options="collegeSearchOptions"
            :search-option.sync="collegeSearchOption"
            :search-value.sync="collegeSearchValue"
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
        <v-col cols="12">
          <generic-search-dialog
            :search-options="courseSearchOptions"
            :search-option.sync="courseSearchOption"
            :search-value.sync="courseSearchValue"
            :action="searchCourses"
            :items="courses"
            :is-loading="isSearchCourseStart"
            label="Course"
            title="Search Course"
            item-value="id"
            :select-value.sync="form.course"
          >
            <template v-slot:select-selection="{ item }">
              <span class="text-capitalize">
                {{ item.name }}
              </span>
            </template>
            <template v-slot:list-item-subtitle-top="{ item }">
              <span class="font-weight-bold text-uppercase">
                {{ item.code }}
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
  createSection,
  getSingleSection,
  setSectionError,
  setSections,
  updateSection
} from "../../store/types/section";
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
import {
  getAllCourses,
  searchCourses,
  setCourses
} from "../../store/types/course";
import GenericCourseSelection from "../../components/generic/selection/Course";
import GenericSearchDialog from "../../components/generic/SearchDialog";
import { getAllYearLevels } from "../../store/types/yearLevel";

const defaultForm = {
  code: "",
  name: "",
  description: "",
  college: null,
  course: null,
  yearLevelId: null
};

const collegeSearchOptions = ["all", "custom ID", "name"];
const courseSearchOptions = ["all", "code", "name"];

export default {
  components: {
    GenericSearchDialog,
    GenericCourseSelection,
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
      collegeSearchOptions,
      courseSearchOptions,
      collegeSearchOption: "all",
      courseSearchOption: "all",
      collegeSearchValue: "",
      courseSearchValue: "",
      isSearchCollegeStart: false,
      isSearchCourseStart: false
    };
  },

  mixins: [customUtilities],

  computed: {
    isFormValid() {
      return (
        this.form.code &&
        this.form.name &&
        this.isObject(this.form.college) &&
        this.isObject(this.form.course) &&
        this.form.yearLevelId
      );
    },

    error() {
      return this.$store.state.section.error;
    },

    colleges() {
      return this.$store.state.college.list;
    },

    courses() {
      return this.$store.state.course.list;
    },

    yearLevels() {
      return this.$store.state.yearLevel.list;
    }
  },

  watch: {
    "$store.state.action.name"(name) {
      if (name === `${createSection}-error`) {
        this.$store.commit(setActionName, "");
        this.isLoading = false;
        return;
      }

      if (name === createSection) {
        this.form = Object.assign({}, this.defaultForm);
        this.$store.commit(setSectionError, []);
        this.$store.commit(setActionName, "");
        this.isLoading = false;
        return;
      }

      if (name === updateSection) {
        this.form = Object.assign({}, this.defaultForm);
        this.$store.commit(setSectionError, []);
        this.$store.commit(setActionName, "");
        this.$router.push({ name: "section-list" });
        return;
      }

      if (name === getAllColleges || name === searchColleges) {
        this.$store.commit(setActionName, "");
        this.isSearchCollegeStart = false;
        return;
      }

      if (name === searchCourses || name === getAllCourses) {
        this.$store.commit(setActionName, "");
        this.isSearchCourseStart = false;
      }
    },

    "$store.state.section.current"(section) {
      if (Object.keys(section).length <= 0)
        return this.$router.push({ name: "section-list" });
      this.form.code = section.code;
      this.form.name = section.name;
      this.form.description = section.description;
      this.form.college = section.college;
      this.form.course = section.course;
      this.form.yearLevelId = section.yearLevel.id;
      this.isLoading = false;
    },

    collegeSearchOption(opt) {
      if (opt === "all") return this.$store.dispatch(getAllColleges);
    },

    courseSearchOption(opt) {
      if (opt === "all") return this.$store.dispatch(getAllCourses);
    }
  },

  methods: {
    create() {
      const payload = {
        code: this.form.code,
        name: this.form.name,
        description: this.form.description,
        yearLevelId: this.form.yearLevelId,
        collegeId: this.form.college.id,
        courseId: this.form.course.id
      };
      this.$store.dispatch(createSection, payload);
      this.isLoading = true;
    },

    update() {
      const sectionId = this.$route.params.sectionId;
      const details = {
        code: this.form.code,
        name: this.form.name,
        description: this.form.description,
        yearLevelId: this.form.yearLevelId,
        collegeId: this.form.college.id,
        courseId: this.form.course.id
      };
      this.$store.dispatch(updateSection, {
        sectionId,
        details
      });
      this.isLoading = true;
    },

    searchColleges() {
      this.isSearchCollegeStart = true;
      if (this.collegeSearchOption === "all")
        return this.$store.dispatch(getAllColleges);
      if (
        this.collegeSearchValue.trim() &&
        ["custom ID", "name"].includes(this.collegeSearchOption)
      ) {
        const searchConfig = {
          option: this.collegeSearchOption,
          value: this.collegeSearchValue
        };
        return this.$store.dispatch(searchColleges, searchConfig);
      }
      this.isSearchCollegeStart = false;
      return this.$store.commit(setColleges, []);
    },

    searchCourses() {
      this.isSearchCourseStart = true;
      if (this.courseSearchOption === "all")
        return this.$store.dispatch(getAllCourses);
      if (
        this.courseSearchValue.trim() &&
        ["code", "name"].includes(this.courseSearchOption)
      ) {
        const searchConfig = {
          option: this.courseSearchOption,
          value: this.courseSearchValue
        };
        return this.$store.dispatch(searchCourses, searchConfig);
      }
      this.isSearchCourseStart = false;
      return this.$store.commit(setCourses, []);
    }
  },

  created() {
    this.$store.dispatch(getAllYearLevels);
    const operation = this.$route.params.operation;
    if (operation === "update") {
      const sectionId = this.$route.params.sectionId;
      this.operation = operation;
      this.$store.dispatch(getSingleSection, sectionId);
      this.isLoading = true;
    }
  },

  destroyed() {
    this.$store.commit(setSections, []);
    this.$store.commit(setSectionError, []);
    this.$store.commit(setActionName, "");
  }
};
</script>
