<template>
  <v-row dense>
    <v-col cols="12">
      <span class="d-block v-card__subtitle pl-0">Spouse Information</span>
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
      </v-row>
    </v-col>
    <v-col cols="12" md="6">
      <span class="d-block v-card__subtitle pl-0">Father Information</span>
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
      </v-row>
    </v-col>
    <v-col cols="12" md="6">
      <span class="d-block v-card__subtitle pl-0">Mother Information</span>
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
      </v-row>
    </v-col>
  </v-row>
</template>
<script>
export default {
  name: "personal-data-sheet-family-form",
};
</script>
