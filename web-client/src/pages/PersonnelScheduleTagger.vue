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
          <v-btn icon @click="isTimeDateRangeDialogShow = true">
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
                <v-list-item-subtitle>Designation 1</v-list-item-subtitle>
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
    <v-dialog width="800" v-model="isTimeDateRangeDialogShow">
      <v-card>
        <v-card-title class="font-weight-bold">
          <span>Time & Date Ranges Form</span>
          <div class="flex-grow-1"></div>
          <v-btn icon @click="isTimeDateRangeDialogShow = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-row dense>
            <v-col cols="12" md="6">
              <v-select outlined label="Date From"></v-select>
            </v-col>
            <v-col cols="12" md="6">
              <v-select outlined label="Date To"></v-select>
            </v-col>
            <v-col cols="12">
              <v-select outlined label="Time"></v-select>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import GenericCalendar from "../components/generic/GenericCalendar";
export default {
  components: { GenericCalendar },

  data() {
    return {
      isTimeDateRangeDialogShow: false,
    };
  },
};
</script>
