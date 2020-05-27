<template>
  <v-dialog width="1000" v-model="isCourseFormDialogShow">
    <v-card>
      <v-card-title class="font-weight-bold">
        <span>Course Form</span>
        <div class="flex-grow-1"></div>
        <v-btn icon @click="isCourseFormDialogShow = false">
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
              @click="isSearchCollegeDialogShow = true"
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
      :is-show.sync="isSearchCollegeDialogShow"
      title="Colleges"
      :items="colleges"
    >
      <template v-slot:item-title="{ item }">
        <span class="text-capitalize">{{ item.name }}</span>
      </template>

      <template v-slot:item-subtitle-top="{ item }">
        <span class="text-uppercase font-weight-bold">{{ item.customId }}</span>
      </template>

      <template v-slot:item-subtitle-bottom="{ item }">
        <span class="text-capitalize">{{
          formatFullName(item.dean.profile)
        }}</span>
      </template>
    </generic-search-dialog>
  </v-dialog>
</template>

<script>
import GenericSearchDialog from "../../components/generic/GenericSearchDialog";
import customUtilities from "../../common/customUtilities";
export default {
  components: { GenericSearchDialog },

  data() {
    return {
      isCourseFormDialogShow: false,
      isSearchCollegeDialogShow: false,
      collegeHeaders: [
        {
          text: "ID",
          value: "customId",
        },

        {
          text: "Name",
          value: "name",
        },

        {
          text: "Dean",
          value: "dean",
        },
      ],
      colleges: [
        {
          customId: "ID-1",
          name: "College-1",
          dean: {
            profile: {
              firstName: "Dean",
              middleName: "Dean",
              lastName: "Dean",
              extension: "Dean",
            },
          },
        },
      ],
    };
  },

  mixins: [customUtilities],

  watch: {
    isCourseFormDialogShow(isCourseFormDialogShow) {
      if (!isCourseFormDialogShow)
        return this.$router.push({ name: "course-list" });
    },
  },

  mounted() {
    this.isCourseFormDialogShow = true;
  },
};
</script>
