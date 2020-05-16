<template>
  <v-card>
    <v-card-title>
      <span class="font-weight-bold">Department Management</span>
      <div class="flex-grow-1"></div>
      <generic-tooltip-button
        icon="plus"
        color="primary"
        title="Create New Department"
        :to="{ name: 'department-form', params: { operation: 'create' } }"
      ></generic-tooltip-button>
    </v-card-title>
    <v-data-table
      :headers="tableHeaders"
      :items="departments"
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
      <template v-slot:item.name="{ item }">
        <span class="text-capitalize">{{ item.name }}</span>
      </template>
      <template v-slot:item.description="{ item }">
        <span class="text-capitalize">{{
          item.description ? item.description : "N/A"
        }}</span>
      </template>
      <template v-slot:item.college="{ item }">
        <span class="text-uppercase">{{
          item.college ? item.college.name : "N/A"
        }}</span>
      </template>
      <template v-slot:item.employee="{ item }">
        <span class="text-capitalize">{{
          item.head
            ? `${item.head.profile.firstName} ${
                item.head.profile.middleName
                  ? `${getTextFirstLetter(item.head.profile.middleName)}.`
                  : ""
              } ${item.head.profile.lastName}`
            : "N/A"
        }}</span>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn icon @click="update(item)">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon @click="selectItem(item)">
          <v-icon>mdi-trash-can</v-icon>
        </v-btn>
      </template>
    </v-data-table>
    <generic-confirm-dialog
      :is-show.sync="isConfirmDialogShow"
      message="Are you sure you want to delete this department?"
      color="secondary"
      :is-loading="isLoading"
      :action="deleteItem"
    ></generic-confirm-dialog>
  </v-card>
</template>

<script>
import GenericSearchToolbar from "../../components/generic/SearchToolbar";
import GenericTooltipButton from "../../components/generic/TooltipButton";
import {
  deleteDepartment,
  getAllDepartments,
  searchDepartments,
  setDepartmentError,
  setDepartments,
} from "../../store/types/department";
import { setActionName } from "../../store/types/action";
import GenericConfirmDialog from "../../components/generic/CustomDialog";
import customUtilities from "../../services/customUtilities";

const tableHeaders = [
  {
    text: "Name",
    value: "name",
    align: "left",
  },
  {
    text: "Description",
    value: "description",
  },
  // {
  //     text: "Head",
  //     value: "employee"
  // },
  {
    text: "Actions",
    value: "actions",
    align: "right",
  },
];
const searchOptions = ["all", "name"];

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

  mixins: [customUtilities],

  computed: {
    departments() {
      return this.$store.state.department.list;
    },

    errors() {
      return this.$store.state.department.errors;
    },
  },

  watch: {
    "$store.state.action.name"(name) {
      if (name === getAllDepartments || searchDepartments) {
        this.isLoading = false;
        this.$store.commit(setActionName, "");
      }

      if (name === `${deleteDepartment}-errors`) {
        this.isLoading = false;
        this.isConfirmDialogShow = false;
        this.$store.commit(setActionName, "");
      }

      if (name === deleteDepartment) {
        this.isLoading = false;
        this.isConfirmDialogShow = false;
        this.$store.commit(setActionName, "");
        this.$store.commit(setDepartmentError, []);
        this.search();
      }
    },

    searchOption(opt) {
      if (opt === "all") return this.$store.dispatch(getAllDepartments);
    },
  },

  methods: {
    search() {
      this.isLoading = true;
      if (this.searchOption === "all")
        return this.$store.dispatch(getAllDepartments);
      if (this.searchValue.trim() && ["name"].includes(this.searchOption)) {
        const searchConfig = {
          option: this.searchOption,
          value: this.searchValue,
        };
        return this.$store.dispatch(searchDepartments, searchConfig);
      }
      this.isLoading = false;
      return this.$store.commit(setDepartments, []);
    },

    update({ id }) {
      this.$router.push({
        name: "department-form",
        params: {
          operation: "update",
          departmentId: id,
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
      this.$store.dispatch(deleteDepartment, id);
    },

    destroyed() {
      this.$store.commit(setDepartments, []);
      this.$store.commit(setDepartmentError, []);
      this.$store.commit(setActionName, "");
    },
  },
};
</script>
