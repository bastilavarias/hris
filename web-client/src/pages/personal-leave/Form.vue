<template>
  <v-dialog width="1000" v-model="isShow">
    <v-card>
      <v-card-title class="font-weight-bold">
        <span>Personal Leave Form</span>
        <div class="flex-grow-1"></div>
        <v-btn icon @click="isCollegeFormDialogShow = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-row dense>
          <v-col cols="12">
            <v-select label="Type" outlined></v-select>
          </v-col>
          <v-col cols="12" md="5">
            <v-select label="Date From" outlined></v-select>
          </v-col>
          <v-col cols="12" md="5">
            <v-select label="Date To" outlined></v-select>
          </v-col>
          <v-col cols="12" md="2">
            <v-text-field label="No Of Days" readonly outlined></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-textarea label="Reason" outlined></v-textarea>
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
      if (!isShow) return this.$router.push({ name: "personal-leave-list" });
    },
  },

  mounted() {
    this.isShow = true;
  },
};
</script>
