<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on }">
      <v-avatar :size="35" v-on="on">
        <v-img
          :src="currentAccountProfileImageUrl"
          :lazy-src="currentAccountProfileImageUrl"
        ></v-img>
      </v-avatar>
    </template>
    <v-list>
      <v-list-item @click="logout">Logout</v-list-item>
    </v-list>
  </v-menu>
</template>
<script>
import { SET_PURGE_ACCOUNT_AUTHENTICATION } from "../../store/types/account";

export default {
  name: "toolbar-menu",

  computed: {
    currentAccountProfileImageUrl() {
      return this.$store.state.account.current.profile.imageUrl;
    },
  },

  methods: {
    logout() {
      this.$store.commit(SET_PURGE_ACCOUNT_AUTHENTICATION);
      this.$router.push({ name: "login" });
    },
  },
};
</script>
