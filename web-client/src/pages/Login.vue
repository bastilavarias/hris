<template>
  <v-app>
    <v-content>
      <v-container>
        <v-row justify="center">
          <v-col cols="12" sm="8" md="6" lg="4">
            <div class="mb-10 text-center">
              <v-avatar :size="100" class="text-center mb-5">
                <v-img
                  src="../assets/logo.png"
                  lazy-src="../assets/logo.png"
                ></v-img>
              </v-avatar>
              <h2>Human Resources Information System</h2>
            </div>
            <div class="mb-10">
              <span class="overline d-block mb-2">Login your credentials.</span>
              <v-text-field outlined label="Username"></v-text-field>
              <v-text-field
                outlined
                label="Username"
                type="password"
              ></v-text-field>
              <v-btn color="primary" block :to="{ name: 'employee-list' }"
                >Login</v-btn
              >
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
    <footer-layout></footer-layout>
  </v-app>
</template>
<script>
import FooterLayout from "../layouts/partials/Footer";
export default {
  components: { FooterLayout },
};
</script>
