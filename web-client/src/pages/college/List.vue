<template>
  <v-card>
    <v-card-title>
      <span class="font-weight-bold">College Management</span>
      <div class="flex-grow-1"></div>
      <generic-tooltip-button
        icon="plus"
        color="primary"
        title="Create New College"
        :to="{ name: 'college-form', params: { operation: 'create' } }"
      ></generic-tooltip-button>
    </v-card-title>
    <v-data-table
      :headers="tableHeaders"
      :items="colleges"
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
      <template v-slot:item.customId="{ item }">
        <span class="font-weight-bold text-uppercase">{{ item.customId }}</span>
      </template>
      <template v-slot:item.name="{ item }">
        <span class="text-capitalize">{{ item.name }}</span>
      </template>
      <template v-slot:item.description="{ item }">
        <span class="text-capitalize">{{
          item.description ? item.description : "N/A"
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
      message="Are you sure you want to delete this college?"
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
  deleteCollege,
  getAllColleges,
  searchColleges,
  setCollegeError,
  setColleges
} from "../../store/types/college";
import { setActionName } from "../../store/types/action";
import GenericConfirmDialog from "../../components/generic/CustomDialog";

const tableHeaders = [
  {
    text: "ID",
    value: "customId"
  },
  {
    text: "Name",
    value: "name"
  },
  {
    text: "Description",
    value: "description"
  },
  {
    text: "Actions",
    value: "actions",
    align: "right"
  }
];

const searchOptions = ["all", "custom ID", "name"];

export default {
  components: {
    GenericConfirmDialog,
    GenericTooltipButton,
    GenericSearchToolbar
  },

  data() {
    return {
      searchOptions,
      tableHeaders,
      isLoading: false,
      searchOption: "all",
      searchValue: "",
      isConfirmDialogShow: false,
      selectedItem: {}
    };
  },

  computed: {
    colleges() {
      return this.$store.state.college.list;
    }
  },

  watch: {
    "$store.state.action.name"(name) {
      if (name === getAllColleges || searchColleges) {
        this.isLoading = false;
        this.$store.commit(setActionName, "");
      }

      if (name === `${deleteCollege}-error`) {
        this.isLoading = false;
        this.isConfirmDialogShow = false;
        this.$store.commit(setActionName, "");
      }

      if (name === deleteCollege) {
        this.isLoading = false;
        this.isConfirmDialogShow = false;
        this.$store.commit(setActionName, "");
        this.$store.commit(setCollegeError, []);
        this.search();
      }
    },

    searchOption(opt) {
      if (opt === "all") return this.$store.dispatch(getAllColleges);
    }
  },

  methods: {
    search() {
      this.isLoading = true;
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
      this.isLoading = false;
      return this.$store.commit(setColleges, []);
    },

    update({ id }) {
      this.$router.push({
        name: "college-form",
        params: {
          operation: "update",
          collegeId: id
        }
      });
    },

    selectItem(item) {
      this.selectedItem = item;
      this.isConfirmDialogShow = true;
    },

    deleteItem() {
      const { id } = this.selectedItem;
      this.isLoading = true;
      this.$store.dispatch(deleteCollege, id);
    },

    destroyed() {
      this.$store.commit(setColleges, []);
      this.$store.commit(setCollegeError, []);
      this.$store.commit(setActionName, "");
    }
  }
};
</script>
