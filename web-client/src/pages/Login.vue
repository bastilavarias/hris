<template>
  <v-app>
    <v-content>
      <v-container class="fill-height">
        <v-row justify="center">
          <v-col cols="12" sm="8" md="6">
            <div class="mb-10 text-center">
              <v-avatar :size="100" class="text-center mb-5">
                <v-img
                  src="../assets/logo.png"
                  lazy-src="../assets/logo.png"
                ></v-img>
              </v-avatar>
              <h2>Human Resources Information System</h2>
            </div>
            <span class="overline d-block mb-2">Login your credentials.</span>
            <v-text-field outlined label="Username"></v-text-field>
            <v-text-field
              outlined
              label="Username"
              type="password"
            ></v-text-field>
            <v-btn color="primary" block>Login</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>
