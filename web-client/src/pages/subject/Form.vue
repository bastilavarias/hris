<template>
  <v-dialog width="800" v-model="isShow">
    <v-card>
      <v-card-title class="font-weight-bold">
        <span>Subject Form</span>
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
            <v-text-field label="Title" outlined></v-text-field>
          </v-col>
          <v-col cols="12" md="10">
            <v-text-field label="Description" outlined></v-text-field>
          </v-col>
          <v-col cols="12" md="2">
            <v-select label="Units" :items="avaiableUnits" outlined></v-select>
          </v-col>
          <v-col cols="12">
            <v-autocomplete
              outlined
              label="Category"
              :items="categories"
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
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      isShow: false,
      avaiableUnits: [2, 3, 5],
      categories: [
        "Category 1",
        "Category 2",
        "Category 3",
        "Category 4",
        "Category 5",
      ],
    };
  },

  watch: {
    isShow(isShow) {
      if (!isShow) return this.$router.push({ name: "subject-list" });
    },
  },

  mounted() {
    this.isShow = true;
  },
};
</script>
