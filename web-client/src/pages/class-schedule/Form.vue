<template>
  <v-dialog width="1000" v-model="isShow">
    <v-card>
      <v-card-title class="font-weight-bold">
        <span>Class Schedule Form</span>
        <div class="flex-grow-1"></div>
        <v-btn icon @click="isShow = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-row dense>
          <v-col cols="12">
            <v-text-field label="Section" outlined></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field label="Subject" outlined></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field label="Faculty" outlined></v-text-field>
          </v-col>
          <v-col cols="12">
            <custom-form-subtitle>Day / Time / Room</custom-form-subtitle>
            <v-data-table
              :headers="dayTimeRoomTableHeaders"
              hide-default-footer
            >
            </v-data-table>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" block>
          Submit
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import CustomFormSubtitle from "../../components/custom/CustomFormSubtitle";
export default {
  components: { CustomFormSubtitle },
  data() {
    return {
      isShow: false,

      dayTimeRoomTableHeaders: [
        {
          text: "Day",
        },

        {
          text: "Time",
        },

        {
          text: "Room",
        },

        {
          text: "Action",
        },
      ],
    };
  },

  watch: {
    isShow(isShow) {
      if (!isShow) return this.$router.push({ name: "class-schedule-list" });
    },
  },

  mounted() {
    this.isShow = true;
  },
};
</script>
