<template>
  <v-dialog width="800" v-model="isShow">
    <v-card>
      <v-card-title class="font-weight-bold">
        <span>Year Level Form</span>
        <div class="flex-grow-1"></div>
        <v-btn icon @click="isShow = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-row dense>
          <v-col cols="12" md="6">
            <v-text-field label="Year From" outlined></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field label="Year To" outlined></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-radio-group label="Set as current school year?">
              <v-radio label="Yes"></v-radio>
              <v-radio label="No"></v-radio>
            </v-radio-group>
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
    };
  },

  watch: {
    isShow(isShow) {
      if (!isShow) return this.$router.push({ name: "school-year-list" });
    },
  },

  mounted() {
    this.isShow = true;
  },
};
</script>
