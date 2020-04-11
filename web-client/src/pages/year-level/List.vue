<template>
  <v-card>
    <v-card-title>
      <span class="font-weight-bold">YearLevel Management</span>
      <div class="flex-grow-1"></div>
      <generic-tooltip-button
        icon="plus"
        color="primary"
        title="Create New YearLevel"
        :to="{ name: 'year-level-form', params: { operation: 'create' } }"
      ></generic-tooltip-button>
    </v-card-title>
    <v-data-table
      :headers="tableHeaders"
      :items="yearLevels"
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
      <template v-slot:item.name="{ item }">
        <span class="text-capitalize d-block">{{ item.name }}</span>
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
      message="Are you sure you want to delete this yearLevel?"
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
  deleteYearLevel,
  getAllYearLevels,
  searchYearLevels,
  setYearLevelError,
  setYearLevels
} from "../../store/types/yearLevel";
import { setActionName } from "../../store/types/action";
import GenericConfirmDialog from "../../components/generic/CustomDialog";

const tableHeaders = [
  {
    text: "Name",
    value: "name"
  },
  {
    text: "Actions",
    value: "actions",
    align: "right"
  }
];
const searchOptions = ["all", "name"];

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
    yearLevels() {
      return this.$store.state.yearLevel.list;
    }
  },

  watch: {
    "$store.state.action.name"(name) {
      if (name === getAllYearLevels || searchYearLevels) {
        this.isLoading = false;
        this.$store.commit(setActionName, "");
      }

      if (name === `${deleteYearLevel}-error`) {
        this.isLoading = false;
        this.isConfirmDialogShow = false;
        this.$store.commit(setActionName, "");
      }

      if (name === deleteYearLevel) {
        this.isLoading = false;
        this.isConfirmDialogShow = false;
        this.$store.commit(setActionName, "");
        this.$store.commit(setYearLevelError, []);
        this.search();
      }
    },

    searchOption(opt) {
      if (opt === "all") return this.$store.dispatch(getAllYearLevels);
    }
  },

  methods: {
    search() {
      this.isLoading = true;
      if (this.searchOption === "all")
        return this.$store.dispatch(getAllYearLevels);
      if (this.searchValue.trim() && ["name"].includes(this.searchOption)) {
        const searchConfig = {
          option: this.searchOption,
          value: this.searchValue
        };
        return this.$store.dispatch(searchYearLevels, searchConfig);
      }
      this.isLoading = false;
      return this.$store.commit(setYearLevels, []);
    },

    update({ id }) {
      this.$router.push({
        name: "year-level-form",
        params: {
          operation: "update",
          yearLevelId: id
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
      this.$store.dispatch(deleteYearLevel, id);
    },

    destroyed() {
      this.$store.commit(setYearLevels, []);
      this.$store.commit(setYearLevelError, []);
      this.$store.commit(setActionName, "");
    }
  }
};
</script>
