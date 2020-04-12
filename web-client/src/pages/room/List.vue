<template>
  <v-card>
    <v-card-title>
      <span class="font-weight-bold">Room Management</span>
      <div class="flex-grow-1"></div>
      <generic-tooltip-button
        icon="plus"
        color="primary"
        title="Create New Room"
        :to="{ name: 'room-form', params: { operation: 'create' } }"
      ></generic-tooltip-button>
    </v-card-title>
    <v-data-table :headers="tableHeaders" :items="rooms" :loading="isLoading">
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
      <template v-slot:item.building="{ item }">
        <span class="text-capitalize d-block">{{ item.building.name }}</span>
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
      message="Are you sure you want to delete this room?"
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
  deleteRoom,
  getAllRooms,
  searchRooms,
  setRoomError,
  setRooms
} from "../../store/types/room";
import { setActionName } from "../../store/types/action";
import GenericConfirmDialog from "../../components/generic/CustomDialog";

const tableHeaders = [
  {
    text: "Name",
    value: "name"
  },
  {
    text: "Building",
    value: "building"
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
    rooms() {
      return this.$store.state.room.list;
    }
  },

  watch: {
    "$store.state.action.name"(name) {
      if (name === getAllRooms || searchRooms) {
        this.isLoading = false;
        this.$store.commit(setActionName, "");
      }

      if (name === `${deleteRoom}-error`) {
        this.isLoading = false;
        this.isConfirmDialogShow = false;
        this.$store.commit(setActionName, "");
      }

      if (name === deleteRoom) {
        this.isLoading = false;
        this.isConfirmDialogShow = false;
        this.$store.commit(setActionName, "");
        this.$store.commit(setRoomError, []);
        this.search();
      }
    },

    searchOption(opt) {
      if (opt === "all") return this.$store.dispatch(getAllRooms);
    }
  },

  methods: {
    search() {
      this.isLoading = true;
      if (this.searchOption === "all") return this.$store.dispatch(getAllRooms);
      if (this.searchValue.trim() && ["name"].includes(this.searchOption)) {
        const searchConfig = {
          option: this.searchOption,
          value: this.searchValue
        };
        return this.$store.dispatch(searchRooms, searchConfig);
      }
      this.isLoading = false;
      return this.$store.commit(setRooms, []);
    },

    update({ id }) {
      this.$router.push({
        name: "room-form",
        params: {
          operation: "update",
          roomId: id
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
      this.$store.dispatch(deleteRoom, id);
    },

    destroyed() {
      this.$store.commit(setRooms, []);
      this.$store.commit(setRoomError, []);
      this.$store.commit(setActionName, "");
    }
  }
};
</script>
