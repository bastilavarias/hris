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
            <v-text-field
              label="Search college name or description"
              solo
            ></v-text-field>
          </v-col>
          <v-col cols="2">
            <v-btn color="primary" large block>Search</v-btn>
          </v-col>
        </v-row>
      </v-card-text>
      <v-data-table :headers="headers" :items="items">
        <template v-slot:item.customId="{ item }">
          <span class="font-weight-bold text-uppercase">{{
            item.customId
          }}</span>
        </template>

        <template v-slot:item.name="{ item }">
          <span class="text-capitalize">{{ item.name }}</span>
        </template>

        <template v-slot:item.dean="{ item }">
          <span class="text-capitalize">{{
            formatFullName(item.dean.profile)
          }}</span>
        </template>
      </v-data-table>
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

    headers: {
      type: Array,
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

  mixins: [customUtilities],

  watch: {
    isShow(val) {
      this.isShowLocal = val;
    },

    isShowLocal(val) {
      this.$emit("update:isShow", val);
    },
  },

  created() {
    this.isShowLocal = this.isShow;
  },
};
</script>
