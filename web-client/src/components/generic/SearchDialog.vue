<template>
  <v-dialog v-model="dialogLocal" width="1000">
    <template v-slot:activator="{ on }">
      <v-select
        :label="label"
        outlined
        readonly
        append-icon="mdi-magnify"
        @click:append="dialogLocal = true"
        :item-value="itemValue"
        :items="selectItems"
        v-model="selectValueLocal"
        clearable
      >
        <template v-slot:selection="{ item }">
          <slot name="select-selection" :item="item"></slot>
        </template>
      </v-select>
    </template>
    <v-card>
      <v-card-title class="text-capitalize">{{ title }}</v-card-title>
      <v-card-text>
        <generic-search-toolbar
          :action="action"
          :search-option.sync="searchOptionLocal"
          :search-options="searchOptions"
          :search-value.sync="searchValueLocal"
        ></generic-search-toolbar>
      </v-card-text>
      <div class="text-center" v-if="!isLoading && items.length === 0">
        <span class="v-subheader d-inline-block theme--light">No Results</span>
      </div>
      <v-list v-else>
        <v-skeleton-loader
          type="list-item-three-line"
          loading
          v-if="isLoading"
        ></v-skeleton-loader>
        <div v-else>
          <v-subheader>Search Results</v-subheader>
          <template v-for="(item, index) in items">
            <v-list-item :key="index" @click="select(item)">
              <v-list-item-content>
                <v-list-item-subtitle>
                  <slot name="list-item-subtitle-top" :item="item"></slot>
                </v-list-item-subtitle>
                <v-list-item-title>
                  <slot name="list-item-title" :item="item"></slot>
                </v-list-item-title>
                <v-list-item-subtitle>
                  <slot name="list-item-subtitle-bottom" :item="item"></slot>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </template>
        </div>
      </v-list>
      <v-card-actions>
        <div class="flex-grow-1"></div>
        <v-btn color="black" text @click="dialogLocal = false">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import GenericSearchToolbar from "./SearchToolbar";
import customUtilities from "../../services/customUtilities";
export default {
  name: "generic-search-dialog",
  components: { GenericSearchToolbar },

  props: {
    searchOptions: {
      type: Array,
      required: true
    },

    searchOption: {
      type: Array,
      required: true
    },

    searchValue: {
      type: String,
      required: true
    },

    action: {
      type: Function,
      required: true
    },

    items: {
      type: Array,
      required: true
    },

    isLoading: {
      type: Boolean,
      required: true
    },

    itemValue: {
      type: String,
      required: true
    },

    title: {
      type: String,
      required: true
    },

    label: {
      type: String,
      required: true
    },

    selectValue: {
      type: Number,
      required: true
    }
  },

  data() {
    return {
      dialogLocal: false,
      searchValueLocal: "",
      searchOptionLocal: "",
      selectValueLocal: null,
      selectItems: []
    };
  },

  mixins: [customUtilities],

  watch: {
    searchValue(val) {
      this.searchValueLocal = val;
    },

    searchValueLocal(val) {
      this.$emit("update:searchValue", val);
    },

    searchOption(val) {
      this.searchOptionLocal = val;
    },

    searchOptionLocal(val) {
      this.$emit("update:searchOption", val);
    },

    selectValue(val) {
      this.selectValueLocal = val;
    },

    selectValueLocal(val) {
      if (this.isObject(val)) {
        this.selectValue = val;
        this.selectItems.push(val);
      }
      this.$emit("update:selectValue", val);
    }
  },

  methods: {
    select(item) {
      this.selectValueLocal = item;
      this.selectItems.push(item);
      this.dialogLocal = false;
    }
  },

  created() {
    this.searchValueLocal = this.searchValue;
    this.searchOptionLocal = this.searchOption;
  }
};
</script>
