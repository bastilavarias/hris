<template>
  <v-dialog width="1000" v-model="isSectionFormDialogShow">
    <v-card>
      <v-card-title class="font-weight-bold">
        <span>Section Form</span>
        <div class="flex-grow-1"></div>
        <v-btn icon @click="isSectionFormDialogShow = false">
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
          <v-col cols="12" md="10">
            <v-text-field label="Description" outlined></v-text-field>
          </v-col>
          <v-col cols="10" md="2">
            <v-select
              label="Year Level"
              outlined
              :items="yearLevels"
            ></v-select>
          </v-col>
          <v-col cols="12">
            <v-autocomplete
              label="College"
              outlined
              readonly
              @click="isCollegeDialogShow = true"
            ></v-autocomplete>
          </v-col>
          <v-col cols="12">
            <v-autocomplete
              label="Course"
              outlined
              readonly
              @click="isCourseDialogShow = true"
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

    <generic-search-dialog
      :is-show.sync="isCourseDialogShow"
      title="Courses"
      :items="courses"
    >
      <template v-slot:item-title="{ item }">
        <span class="text-capitalize">{{ item.name }}</span>
      </template>

      <template v-slot:item-subtitle-top="{ item }">
        <span class="text-uppercase font-weight-bold">{{ item.code }}</span>
      </template>

      <template v-slot:item-subtitle-bottom="{ item }">
        <span class="text-capitalize">{{ item.college.name }}</span>
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
      isSectionFormDialogShow: false,
      yearLevels: ["1st Year", "2nd Year", "3rd Year", "4th Year", "5th Year"],
      isCollegeDialogShow: false,
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

        {
          customId: "ID-2",
          name: "College-2",
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
      isCourseDialogShow: false,
      courseHeaders: [
        {
          text: "Code",
          value: "code",
        },

        {
          text: "Name",
          value: "name",
        },

        {
          text: "College",
          value: "college",
        },
      ],
      courses: [
        {
          code: "CODE-1",
          name: "Course-1",
          college: {
            id: 0,
            name: "college-1",
          },
        },

        {
          code: "CODE-2",
          name: "Course-2",
          college: {
            id: 0,
            name: "college-2",
          },
        },
      ],
    };
  },

  mixins: [customUtilities],

  watch: {
    isSectionFormDialogShow(isSectionFormDialogShow) {
      if (!isSectionFormDialogShow)
        return this.$router.push({ name: "section-list" });
    },
  },

  mounted() {
    this.isSectionFormDialogShow = true;
  },
};
</script>
