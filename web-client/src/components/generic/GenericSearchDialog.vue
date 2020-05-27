<template>
  <v-dialog v-model="isShowLocal" width="800">
    <v-card>
      <v-card-title>
        <span class="font-weight-bold">{{ title }}</span>
        <div class="flex-grow-1"></div>
        <v-btn icon @click="isShowLocal = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-row dense>
          <v-col cols="10">
            <v-text-field label="Search here" solo></v-text-field>
          </v-col>
          <v-col cols="2">
            <v-btn color="primary" large block>Search</v-btn>
          </v-col>
        </v-row>
      </v-card-text>
      <v-list three-line>
        <template v-for="(item, index) in items">
          <v-list-item :key="index">
            <v-list-item-content>
              <v-list-item-subtitle>
                <slot name="item-subtitle-top" :item="item"></slot>
              </v-list-item-subtitle>
              <v-list-item-title>
                <slot name="item-title" :item="item"></slot>
              </v-list-item-title>
              <v-list-item-subtitle>
                <slot name="item-subtitle-bottom" :item="item"></slot>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider v-if="!isItemsInLastItem(index)"></v-divider>
        </template>
      </v-list>
    </v-card>
  </v-dialog>
</template>

<script>
import customUtilities from "../../common/customUtilities";

export default {
  name: "generic-search-dialog",

  props: {
    isShow: {
      type: Boolean,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    items: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      isShowLocal: false,
    };
  },

  watch: {
    isShow(val) {
      this.isShowLocal = val;
    },

    isShowLocal(val) {
      this.$emit("update:isShow", val);
    },
  },

  methods: {
    isItemsInLastItem(index) {
      return this.items.length - 1 === index;
    },
  },

  created() {
    this.isShowLocal = this.isShow;
  },
};
</script>
