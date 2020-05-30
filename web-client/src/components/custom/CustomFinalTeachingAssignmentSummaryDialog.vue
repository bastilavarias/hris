<template>
  <v-dialog v-model="isShowLocal" width="800">
    <v-card>
      <v-card-title>
        <span class="font-weight-bold">FTA Summary</span>
        <div class="flex-grow-1"></div>
        <v-btn icon @click="isShowLocal = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-row dense>
          <v-col cols="12">
            <v-text-field label="Semester & School year" outlined readonly>
            </v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field label="Effectivity Date" outlined readonly>
            </v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <custom-form-subtitle>Schedule</custom-form-subtitle>
            <v-data-table
              hide-default-footer
              :headers="scheduletableheaders"
            ></v-data-table>
          </v-col>
          <v-col cols="12" md="6">
            <custom-form-subtitle
              >Summary Of Teaching Load</custom-form-subtitle
            >
            <v-data-table
              hide-default-footer
              :headers="summaryOfTeachingLoadTableHeaders"
            ></v-data-table>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import CustomFormSubtitle from "./CustomFormSubtitle";
export default {
  name: "custom-final-teaching-assignment-summary-dialog",
  components: { CustomFormSubtitle },
  props: {
    isShow: {
      type: Boolean,
      required: true,
    },
  },

  data() {
    return {
      isShowLocal: false,

      scheduletableheaders: [
        {
          text: "Day",
        },

        {
          text: "Time",
        },

        {
          text: "Hour",
        },
      ],

      summaryOfTeachingLoadTableHeaders: [
        {
          text: "Load Type",
        },

        {
          text: "Count",
        },
      ],
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

  created() {
    this.isShowLocal = this.isShow;
  },
};
</script>
