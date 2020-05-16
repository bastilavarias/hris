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
              <p class="body-2 font-weight-bold d-block text-center mt-10">
                Copyright © UDM Dev Team {{ new Date().getFullYear() }}.
              </p>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>
