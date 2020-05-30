<template>
  <v-dialog width="800" v-model="isShow">
    <v-card>
      <v-card-title class="font-weight-bold">
        <span>Employee Leave Form</span>
        <div class="flex-grow-1"></div>
        <v-btn icon @click="isShow = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-row dense>
          <v-col cols="12">
            <custom-form-subtitle>Employee Details</custom-form-subtitle>
            <v-row dense>
              <v-col cols="12">
                <v-text-field
                  outlined
                  label="Employee Number"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field outlined label="Name" readonly></v-text-field>
              </v-col>
              <v-col cols="12" md="8">
                <v-text-field
                  outlined
                  label="Department"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  outlined
                  label="Designation"
                  readonly
                ></v-text-field>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12">
            <custom-form-subtitle>Leave Details</custom-form-subtitle>
            <v-row dense>
              <v-col cols="12">
                <v-select outlined label="Type" readonly></v-select>
              </v-col>
              <v-col cols="12" md="6">
                <v-select outlined label="From" readonly></v-select>
              </v-col>
              <v-col cols="12" md="6">
                <v-select outlined label="To" readonly></v-select>
              </v-col>
              <v-col cols="12">
                <v-textarea outlined label="Reason"></v-textarea>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-row dense>
          <v-col cols="12" md="2">
            <v-btn color="error" block>
              Reject
            </v-btn>
          </v-col>
          <v-col cols="12" md="10">
            <v-btn color="primary" block>
              Approve
            </v-btn>
          </v-col>
        </v-row>
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
    };
  },

  watch: {
    isShow(isShow) {
      if (!isShow) return this.$router.push({ name: "employee-leave-list" });
    },
  },

  mounted() {
    this.isShow = true;
  },
};
</script>
