<template>
  <div>
    <span class="d-block v-card__subtitle pl-0">Permanent Address</span>
    <v-row dense>
      <v-col cols="12" md="6">
        <v-text-field label="House/Block/Lot No." outlined></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field label="Street" outlined></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field label="Subdivision/Village" outlined></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field label="Barangay" outlined></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-autocomplete label="City/Municipality" outlined></v-autocomplete>
      </v-col>
      <v-col cols="12" md="6">
        <v-autocomplete label="Province" outlined></v-autocomplete>
      </v-col>
      <v-col cols="12">
        <v-text-field label="Zip Code" outlined></v-text-field>
      </v-col>
    </v-row>
    <span class="d-block v-card__subtitle pl-0">Residential Address</span>
    <v-row dense>
      <v-row dense>
        <v-col cols="12" md="6">
          <v-text-field label="House/Block/Lot No." outlined></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field label="Street" outlined></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field label="Subdivision/Village" outlined></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field label="Barangay" outlined></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-autocomplete label="City/Municipality" outlined></v-autocomplete>
        </v-col>
        <v-col cols="12" md="6">
          <v-autocomplete label="Province" outlined></v-autocomplete>
        </v-col>
        <v-col cols="12">
          <v-text-field label="Zip Code" outlined></v-text-field>
        </v-col>
      </v-row>
    </v-row>
  </div>
</template>
<script>
export default {
  name: "personal-data-sheet-address-form",
};
</script>
