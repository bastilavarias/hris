<template>
  <div>
    <span class="d-block v-card__subtitle pl-0">Issued ID</span>
    <v-row dense>
      <v-col cols="12">
        <v-text-field label="Government Issued ID" outlined></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-text-field label="ID/License/Passport No." outlined></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-text-field label="Date Of Issuance" outlined></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-text-field label="Place Of Issuance" outlined></v-text-field>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  name: "personal-data-sheet-issued-id-form",
};
</script>
