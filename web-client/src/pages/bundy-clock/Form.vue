<template>
  <v-dialog v-model="isShow" width="1000">
    <v-card>
      <v-card-title class="font-weight-bold">
        <span>Employee Information</span>
        <div class="flex-grow-1"></div>
        <v-btn icon @click="isShow = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-row dense>
          <v-col cols="12" md="8">
            <v-row dense>
              <v-col cols="12">
                <v-text-field outlined label="Employee Number"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field outlined label="Name"></v-text-field>
              </v-col>
              <v-col cols="12" md="8">
                <v-text-field outlined label="Department"></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field outlined label="Designation"></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-btn color="primary" x-large block>TIME IN</v-btn>
              </v-col>
              <v-col cols="12" md="6">
                <v-btn color="error" x-large block>TIME OUT</v-btn>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" md="4">
            <div class="text-center">
              <v-avatar :size="200" tile>
                <v-img src="https://i.redd.it/sgratkx3xj731.png"></v-img>
              </v-avatar>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
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
      if (!isShow) return this.$router.push({ name: "bundy-clock-search" });
    },
  },

  mounted() {
    this.isShow = true;
  },
};
</script>
