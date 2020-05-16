<template>
  <v-card>
    <v-card-title class="font-weight-bold">Employee Form</v-card-title>
    <v-card-text>
      <v-row dense>
        <v-col cols="12">
          <custom-form-subtitle>Work Details</custom-form-subtitle>
        </v-col>
        <v-col cols="12">
          <v-text-field
            label="Employee Number"
            outlined
            placeholder="XX-XXXX-XXXX"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-autocomplete label="Department" outlined></v-autocomplete>
        </v-col>
        <v-col cols="12" md="4">
          <v-autocomplete label="Designation" outlined></v-autocomplete>
        </v-col>
        <v-col cols="12" md="2">
          <v-select label="Appointment Status" outlined></v-select>
        </v-col>
        <v-col cols="12" md="6">
          <v-row dense>
            <v-col cols="12">
              <custom-form-subtitle>Profile</custom-form-subtitle>
            </v-col>
            <v-col cols="12">
              <v-text-field label="First Name" outlined></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field label="Middle Name" outlined></v-text-field>
            </v-col>
            <v-col cols="12" md="10">
              <v-text-field label="Surname" outlined></v-text-field>
            </v-col>
            <v-col cols="12" md="2">
              <v-text-field label="Extension" outlined></v-text-field>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="6">
          <div class="text-center">
            <v-avatar :size="150" color="primary" class="mb-10"></v-avatar>
            <v-file-input
              label="Image"
              placeholder="Choose an image"
              outlined
              prepend-icon="mdi-camera"
            ></v-file-input>
          </div>
        </v-col>
        <v-col cols="12" md="4">
          <v-select label="Date Of Birth" outlined></v-select>
        </v-col>
        <v-col cols="12" md="8">
          <v-autocomplete label="Place Of Birth" outlined></v-autocomplete>
        </v-col>
        <v-col cols="12" md="2">
          <v-select label="Sex" outlined></v-select>
        </v-col>
        <v-col cols="12" md="5">
          <v-select label="Civil Status" outlined></v-select>
        </v-col>
        <v-col cols="12" md="5">
          <v-autocomplete label="Citizenship(s)" outlined></v-autocomplete>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" block>
        Submit
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import CustomFormSubtitle from "../../components/CustomFormSubtitle";
export default {
  components: { CustomFormSubtitle },
};
</script>
