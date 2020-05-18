<template>
  <div>
    <span class="d-block v-card__subtitle pl-0">Contact</span>
    <v-row dense>
      <v-col cols="12" md="6">
        <v-text-field outlined label="Telephone No."></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field outlined label="Mobile No."></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-text-field outlined label="E-mail Address"></v-text-field>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "personal-data-sheet-contact-form",
};
</script>
