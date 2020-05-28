<template>
  <v-card min-height="500">
    <v-card-title class="primary white--text">
      <div class="flex-grow-1"></div>
      <span class="font-weight-bold">UDM - Employee Digital Bundy Clock</span>
      <div class="flex-grow-1"></div>
    </v-card-title>
    <v-container class="fill-height">
      <v-row justify="center">
        <v-col cols="12" sm="8" md="6" lg="4">
          <div class="text-center">
            <generic-clock class-name="mt-10 mb-5"></generic-clock>
            <h3 class="mb-5">2020-05-28 THU</h3>
            <v-text-field
              solo
              rounded
              label="Search Employee"
              append-icon="mdi-account-search"
            ></v-text-field>
          </div>
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
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
<script>
import GenericClock from "../../components/generic/GenericClock";
export default {
  components: { GenericClock },
};
</script>
