<template>
  <div>
    <v-row dense>
      <v-col cols="12">
        <v-text-field outlined label="First Name"></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-text-field outlined label="Middle"></v-text-field>
      </v-col>
      <v-col cols="10">
        <v-text-field outlined label="Surname"></v-text-field>
      </v-col>
      <v-col cols="2">
        <v-text-field outlined label="Extension"></v-text-field>
      </v-col>
      <v-col cols="4">
        <v-select outlined label="Date Of Birth"></v-select>
      </v-col>
      <v-col cols="8">
        <v-autocomplete outlined label="Birth Place"></v-autocomplete>
      </v-col>
      <v-col cols="2">
        <v-select outlined label="Sex"></v-select>
      </v-col>
      <v-col cols="5">
        <v-select outlined label="Civil Status"></v-select>
      </v-col>
      <v-col cols="5">
        <v-autocomplete outlined label="Citizenship(s)"></v-autocomplete>
      </v-col>
      <v-col cols="6">
        <v-select outlined label="Blood Type"></v-select>
      </v-col>
      <v-col cols="3">
        <v-text-field type="number" outlined label="Height"></v-text-field>
      </v-col>
      <v-col cols="3">
        <v-text-field type="number" outlined label="Weight"></v-text-field>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  name: "personal-data-sheet-profile-form",
};
</script>
