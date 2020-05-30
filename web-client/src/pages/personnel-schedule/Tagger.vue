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
        <v-list>
          <template v-for="n in 3">
            <v-list-item :key="n">
              <v-list-item-avatar>
                <v-img src="https://i.redd.it/sgratkx3xj731.png"></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-subtitle class="font-weight-bold text-uppercase"
                  >Employee-123</v-list-item-subtitle
                >
                <v-list-item-title>Employee Name</v-list-item-title>
                <v-list-item-subtitle>Department 1</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list>
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
import GenericCalendar from "../../components/generic/GenericCalendar";
export default {
  components: { GenericCalendar },
};
</script>
