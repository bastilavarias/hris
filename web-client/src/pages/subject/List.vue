<template>
  <v-card>
    <v-card-title>
      <span class="font-weight-bold">Subject Management</span>
      <div class="flex-grow-1"></div>
      <generic-tooltip-button
        icon="plus"
        color="primary"
        title="Create New Subject"
        :to="{ name: 'subject-form', params: { operation: 'create' } }"
      ></generic-tooltip-button>
    </v-card-title>
    <v-data-table
      :headers="tableHeaders"
      :items="subjects"
      :loading="isLoading"
    >
      <template v-slot:top>
        <v-card-text>
          <generic-search-toolbar
            :search-options="searchOptions"
            :search-option.sync="searchOption"
            :search-value.sync="searchValue"
            :action="search"
          ></generic-search-toolbar>
        </v-card-text>
      </template>
      <template v-slot:item.code="{ item }">
        <span class="font-weight-bold text-uppercase">{{ item.code }}</span>
      </template>
      <template v-slot:item.title="{ item }">
        <span class="text-capitalize">{{ item.title }}</span>
      </template>
      <template v-slot:item.description="{ item }">
        <span class="text-capitalize">{{
          item.description ? item.description : "N/A"
        }}</span>
      </template>
      <template v-slot:item.category="{ item }">
        <span class="text-capitalize">{{ item.category.name }}</span>
      </template>
      <template v-slot:item.prerequisite="{ item }">
        <span class="text-capitalize">{{
          item.prerequisite ? item.prerequisite.title : "N/A"
        }}</span>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn icon @click="view(item)">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon @click="selectItem(item)">
          <v-icon>mdi-trash-can</v-icon>
        </v-btn>
      </template>
    </v-data-table>
    <generic-confirm-dialog
      :is-show.sync="isConfirmDialogShow"
      message="Are you sure you want to delete this subject?"
      color="secondary"
      :is-loading="isLoading"
      :action="deleteItem"
    ></generic-confirm-dialog>
    <router-view></router-view>
  </v-card>
</template>

<script>
import GenericSearchToolbar from "../../components/generic/SearchToolbar";
import GenericTooltipButton from "../../components/generic/TooltipButton";
import {
  deleteSubject,
  getAllSubjects,
  searchSubjects,
  setSubjectError,
  setSubjects,
} from "../../store/types/subject";
import { setActionName } from "../../store/types/action";
import GenericConfirmDialog from "../../components/generic/CustomDialog";

const tableHeaders = [
  {
    text: "Code",
    value: "code",
  },
  {
    text: "Title",
    value: "title",
  },
  {
    text: "Description",
    value: "description",
  },
  {
    text: "Units",
    value: "units",
  },
  {
    text: "Category",
    value: "category",
  },
  {
    text: "Prerequisite",
    value: "prerequisite",
  },
  {
    text: "Actions",
    value: "actions",
    align: "right",
  },
];
const searchOptions = ["all", "code", "title"];

export default {
  components: {
    GenericConfirmDialog,
    GenericTooltipButton,
    GenericSearchToolbar,
  },

  data() {
    return {
      searchOptions,
      tableHeaders,
      isLoading: false,
      searchOption: "all",
      searchValue: "",
      isConfirmDialogShow: false,
      selectedItem: {},
    };
  },

  computed: {
    subjects() {
      return this.$store.state.subject.list;
    },
  },

  watch: {
    "$store.state.action.name"(name) {
      if (name === getAllSubjects || searchSubjects) {
        this.isLoading = false;
        this.$store.commit(setActionName, "");
      }

      if (name === `${deleteSubject}-errors`) {
        this.isLoading = false;
        this.isConfirmDialogShow = false;
        this.$store.commit(setActionName, "");
      }

      if (name === deleteSubject) {
        this.isLoading = false;
        this.isConfirmDialogShow = false;
        this.$store.commit(setActionName, "");
        this.$store.commit(setSubjectError, []);
        this.search();
      }
    },

    searchOption(opt) {
      if (opt === "all") return this.$store.dispatch(getAllSubjects);
    },
  },

  methods: {
    search() {
      this.isLoading = true;
      if (this.searchOption === "all")
        return this.$store.dispatch(getAllSubjects);
      if (
        this.searchValue.trim() &&
        ["code", "title"].includes(this.searchOption)
      ) {
        const searchConfig = {
          option: this.searchOption,
          value: this.searchValue,
        };
        return this.$store.dispatch(searchSubjects, searchConfig);
      }
      this.isLoading = false;
      return this.$store.commit(setSubjects, []);
    },

    view({ id }) {
      this.$router.push({
        name: "subject-form",
        params: {
          operation: "view",
          subjectId: id,
        },
      });
    },

    selectItem(item) {
      this.selectedItem = item;
      this.isConfirmDialogShow = true;
    },

    deleteItem() {
      const { id } = this.selectedItem;
      this.isLoading = true;
      this.$store.dispatch(deleteSubject, id);
    },
  },

  destroyed() {
    this.$store.commit(setSubjects, []);
    this.$store.commit(setSubjectError, []);
    this.$store.commit(setActionName, "");
  },
};
</script>
