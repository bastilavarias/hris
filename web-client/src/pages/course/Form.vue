<template>
  <v-dialog width="800" v-model="isShow">
    <v-card>
      <v-card-title class="font-weight-bold">
        <span>Course Form</span>
        <div class="flex-grow-1"></div>
        <v-btn icon @click="isShow = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-row dense>
          <v-col cols="12">
            <v-text-field label="Code" outlined></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field label="Name" outlined></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field label="Description" outlined></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-autocomplete
              label="College"
              outlined
              readonly
              @click="isCollegeDialogShow = true"
            ></v-autocomplete>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" block>
          Submit
        </v-btn>
      </v-card-actions>
    </v-card>
    <generic-search-dialog
      :is-show.sync="isCollegeDialogShow"
      title="Colleges"
      :headers="collegeHeaders"
    ></generic-search-dialog>
  </v-dialog>
</template>

<script>
import GenericSearchDialog from "../../components/generic/GenericSearchDialog";
export default {
  components: { GenericSearchDialog },
  data() {
    return {
      isShow: false,
      isCollegeDialogShow: false,
      collegeHeaders: [
        {
          text: "ID",
        },

        {
          text: "Name",
        },

        {
          text: "Dean",
        },
      ],
      colleges: [],
    };
  },

  watch: {
    isShow(isShow) {
      if (!isShow) return this.$router.push({ name: "course-list" });
    },
  },

  mounted() {
    this.isShow = true;
  },
};
</script>
