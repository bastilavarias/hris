<template>
  <v-row>
    <v-col cols="12">
      <v-card>
        <v-card-text class="pb-md-0">
          <v-row dense>
            <v-col cols="12" md="4">
              <v-autocomplete outlined label="Department"></v-autocomplete>
            </v-col>
            <v-col cols="12" md="3">
              <v-select outlined label="Date From"></v-select>
            </v-col>
            <v-col cols="12" md="3">
              <v-select outlined label="Date To"></v-select>
            </v-col>
            <v-col cols="12" md="2">
              <v-btn color="primary" large block>
                <v-icon class="mr-1">mdi-magnify</v-icon>
                <span>Search</span>
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
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
