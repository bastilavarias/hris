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
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    outlined
                    label="Username"
                    v-model="form.username"
                    :error="hasError(accountError.username)"
                    :error-messages="accountError.username"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    outlined
                    label="Password"
                    type="password"
                    v-model="form.password"
                    :error="hasError(accountError.password)"
                    :error-messages="accountError.password"
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-btn
                    color="primary"
                    block
                    @click="login"
                    :loading="isLoading"
                    :disabled="!isFormValid"
                    >Login</v-btn
                  >
                </v-col>
              </v-row>
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

<script>
import { ACCOUNT_LOGIN, SET_ACCOUNT_ERROR } from "../store/types/account";
import customUtilities from "../common/customUtilities";

const defaultForm = {
  username: "",
  password: "",
};

export default {
  data() {
    return {
      isLoading: false,
      form: Object.assign({}, defaultForm),
      defaultForm,
    };
  },

  mixins: [customUtilities],

  computed: {
    accountError() {
      return this.$store.state.account.error;
    },

    isFormValid() {
      return this.form.username && this.form.password;
    },

    currentAccountActions() {
      return this.$store.state.account.current.actions;
    },
  },

  watch: {
    "$store.state.account.isAuthenticated"(isAuthenticated) {
      if (isAuthenticated) {
        const redirectTo = this.currentAccountActions[0].to;
        this.$router.push(redirectTo);
        this.$store.commit(SET_ACCOUNT_ERROR, {});
      }
    },
  },

  methods: {
    async login() {
      this.isLoading = true;
      const payload = {
        username: this.form.username,
        password: this.form.password,
      };
      await this.$store.dispatch(ACCOUNT_LOGIN, payload);
      this.isLoading = false;
    },
  },
};
</script>
