<template>
  <v-row>
    <v-col cols="12" md="4">
      <v-card>
        <v-toolbar flat>
          <v-text-field
            hide-details
            prepend-inner-icon="mdi-magnify"
            outlined
            dense
            placeholder="Search here"
          ></v-text-field>
          <v-btn icon>
            <v-icon>mdi-sort</v-icon>
          </v-btn>
          <v-btn icon :to="{ name: 'department-form' }">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-toolbar>
      </v-card>
    </v-col>
    <v-col cols="12" md="8">
      <v-card>
        <v-card-text>
          <generic-calendar></generic-calendar>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import GenericCalendar from "../../components/GenericCalendar";
export default {
  components: { GenericCalendar },
};
</script>
