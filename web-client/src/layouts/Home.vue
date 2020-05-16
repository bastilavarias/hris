<template>
  <v-app>
    <v-app-bar app></v-app-bar>
    <v-navigation-drawer app>
      <navigation-drawer-content></navigation-drawer-content>
    </v-navigation-drawer>
    <v-content>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-content>
    <footer-layout></footer-layout>
  </v-app>
</template>
<script>
import FooterLayout from "./partials/Footer";
import NavigationDrawerContent from "./partials/NavigationDrawerContent";
export default {
  components: { NavigationDrawerContent, FooterLayout },
};
</script>
