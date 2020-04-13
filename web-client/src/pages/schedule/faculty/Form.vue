<template>
  <v-card>
    <v-card-title>
      <generic-back-button title="Faculty Schedule Form"></generic-back-button>
      <div class="flex-grow-1"></div>
      <v-btn icon>
        <v-icon>mdi-information</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-text>
      <v-row dense>
        <v-col cols="12">
          <generic-search-dialog
            :search-options="sectionSearchOptions"
            :search-option.sync="sectionSearchOption"
            :search-value.sync="sectionSearchValue"
            :action="searchSection"
            :items="sections"
            :is-loading="isSearchSectionStart"
            label="Section"
            title="Search Section"
            :select-value="form.section"
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
        <v-col cols="12">
          <generic-search-dialog
            :search-options="subjectSearchOptions"
            :search-option.sync="subjectSearchOption"
            :search-value.sync="subjectSearchValue"
            :action="searchSubject"
            :items="subjects"
            :is-loading="isSearchSubjectStart"
            label="Subject"
            title="Search Subject"
            :select-value="form.subject"
          >
            <template v-slot:select-selection="{ item }">
              <span class="text-capitalize">
                {{ item.title }}
              </span>
            </template>
            <template v-slot:list-item-subtitle-top="{ item }">
              <span class="font-weight-bold text-uppercase">
                {{ item.code }}
              </span>
            </template>
            <template v-slot:list-item-title="{ item }">
              <span class="text-capitalize"> {{ item.title }} </span>
            </template>
            <template v-slot:list-item-subtitle-bottom="{ item }">
              <div v-if="isObject(item.prerequisite)">
                <span class="font-weight-bold text-capitalize mr-1">
                  Prerequisite:
                </span>
                <spa class="text-capitalize">
                  {{ item.prerequisite.title }}
                </spa>
              </div>
            </template>
          </generic-search-dialog>
        </v-col>
        <v-col cols="12">
          <generic-search-dialog
            :search-options="employeeSearchOptions"
            :search-option.sync="employeeSearchOption"
            :search-value.sync="employeeSearchValue"
            :action="searchEmployee"
            :items="employees"
            :is-loading="isSearchEmployeeStart"
            label="Faculty"
            title="Search Employee"
            :select-value="form.employee"
          >
            <template v-slot:select-selection="{ item }">
              <span class="text-capitalize">
                {{ formatFullName(item.profile) }}
              </span>
            </template>
            <template v-slot:list-item-subtitle-top="{ item }">
              <span class="font-weight-bold text-uppercase">
                {{ item.employeeNumber }}
              </span>
            </template>
            <template v-slot:list-item-title="{ item }">
              <span class="text-capitalize">
                {{ formatFullName(item.profile) }}
              </span>
            </template>
            <template v-slot:list-item-subtitle-bottom="{ item }">
              <span class="text-capitalize">{{ item.department.name }}</span>
            </template>
          </generic-search-dialog>
        </v-col>
        <v-col cols="12">
          <span class="v-label theme--light">Day / Time / Room</span>
          <v-row dense v-if="!isScheduleDayTimeRoomTBA">
            <v-col cols="12" md="3">
              <v-select label="Day"></v-select>
            </v-col>
            <v-col cols="12" md="2">
              <generic-time-picker
                :time.sync="time"
                label="Start Time"
              ></generic-time-picker>
            </v-col>
            <v-col cols="12" md="2">
              <generic-time-picker
                :time.sync="time"
                label="End Time"
              ></generic-time-picker>
            </v-col>
            <v-col cols="12" md="3">
              <v-autocomplete label="Room"></v-autocomplete>
            </v-col>
            <v-col cols="12" md="2" align-self="center">
              <v-row justify="center" align="center">
                <v-btn color="primary" fab small class="mr-2">
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
                <v-btn color="error" fab small>
                  <v-icon>mdi-trash-can</v-icon>
                </v-btn>
              </v-row>
            </v-col>
          </v-row>
          <v-checkbox color="primary" v-model="isScheduleDayTimeRoomTBA">
            <template v-slot:label
              >Is day, time, and room is to be announce?
            </template>
          </v-checkbox>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" block>Submit</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import GenericCardBackButton from "../../../components/generic/CardBackButton";
import GenericTimePicker from "../../../components/generic/TimePicker";
import GenericBackButton from "../../../components/generic/BackButton";
import {
  createSection,
  getAllSections,
  searchSections,
  setSectionError,
  setSections,
  updateSection
} from "../../../store/types/section";
import {
  getAllSubjects,
  searchSubjects,
  setSubjects
} from "../../../store/types/subject";
import GenericSearchDialog from "../../../components/generic/SearchDialog";
import {
  getAllColleges,
  searchColleges,
  setColleges
} from "../../../store/types/college";
import { setActionName } from "../../../store/types/action";
import { getAllCourses, searchCourses } from "../../../store/types/course";
import {
  getAllEmployees,
  searchEmployees,
  setEmployees
} from "../../../store/types/employee";
import customUtilities from "../../../services/customUtilities";

const sectionSearchOptions = ["all", "code", "name"];
const subjectSearchOptions = ["all", "code", "title"];
const employeeSearchOptions = ["all", "employee number", "last name"];

const defaultForm = {
  section: null,
  subject: null,
  employee: null
};

export default {
  name: "schedule-schedule-form",
  components: {
    GenericSearchDialog,
    GenericBackButton,
    GenericTimePicker,
    GenericCardBackButton
  },

  data() {
    return {
      form: Object.assign({}, defaultForm),
      defaultForm,
      time: null,
      isScheduleDayTimeRoomTBA: false,
      dayTimeRoom: [],
      sectionSearchOption: "all",
      subjectSearchOption: "all",
      employeeSearchOption: "all",
      isSearchSectionStart: false,
      isSearchSubjectStart: false,
      isSearchEmployeeStart: false,
      sectionSearchOptions,
      subjectSearchOptions,
      employeeSearchOptions,
      sectionSearchValue: "",
      subjectSearchValue: "",
      employeeSearchValue: ""
    };
  },

  mixins: [customUtilities],

  computed: {
    sections() {
      return this.$store.state.section.list;
    },

    subjects() {
      return this.$store.state.subject.list;
    },

    employees() {
      return this.$store.state.employee.list;
    }
  },

  watch: {
    "$store.state.action.name"(name) {
      if (name === getAllSections || name === searchSections) {
        this.$store.commit(setActionName, "");
        this.isSearchSectionStart = false;
        return;
      }

      if (name === getAllSubjects || name === searchSubjects) {
        this.$store.commit(setActionName, "");
        this.isSearchSubjectStart = false;
        return;
      }

      if (name === getAllEmployees || name === searchEmployees) {
        this.$store.commit(setActionName, "");
        this.isSearchEmployeeStart = false;
      }
    },

    sectionSearchOption(opt) {
      if (opt === "all") return this.$store.dispatch(getAllSections);
    },

    subjectSearchOption(opt) {
      if (opt === "all") return this.$store.dispatch(getAllSubjects);
    },

    employeeSearchOption(opt) {
      if (opt === "all") return this.$store.dispatch(getAllEmployees);
    }
  },

  methods: {
    searchSection() {
      this.isSearchSectionStart = true;
      if (this.sectionSearchOption === "all")
        return this.$store.dispatch(getAllSections);
      if (
        this.sectionSearchValue.trim() &&
        ["code", "name"].includes(this.sectionSearchOption)
      ) {
        const searchConfig = {
          option: this.sectionSearchOption,
          value: this.sectionSearchValue
        };
        return this.$store.dispatch(searchSections, searchConfig);
      }
      this.isSearchSectionStart = false;
      return this.$store.commit(setSections, []);
    },
    searchSubject() {
      this.isSearchSubjectStart = true;
      if (this.subjectSearchOption === "all")
        return this.$store.dispatch(getAllSubjects);
      if (
        this.subjectSearchValue.trim() &&
        ["code", "title"].includes(this.subjectSearchOption)
      ) {
        const searchConfig = {
          option: this.subjectSearchOption,
          value: this.subjectSearchValue
        };
        return this.$store.dispatch(searchSubjects, searchConfig);
      }
      this.isSearchSubjectStart = false;
      return this.$store.commit(setSubjects, []);
    },
    searchEmployee() {
      this.isSearchEmployeeStart = true;
      if (this.employeeSearchOption === "all")
        return this.$store.dispatch(getAllEmployees);
      if (
        this.employeeSearchValue.trim() &&
        ["employee number", "last name"].includes(this.employeeSearchOption)
      ) {
        const searchConfig = {
          option: this.employeeSearchOption,
          value: this.employeeSearchValue
        };
        return this.$store.dispatch(searchEmployees, searchConfig);
      }
      this.isSearchEmployeeStart = false;
      return this.$store.commit(setEmployees, []);
    }
  }
};
</script>
