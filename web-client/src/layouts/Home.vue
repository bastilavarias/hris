<template>
  <v-app>
    <v-app-bar app :elevation="1" color="white">
      <v-app-bar-nav-icon
        @click="isSideDrawerShow = !isSideDrawerShow"
      ></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <toolbar-menu></toolbar-menu>
    </v-app-bar>
    <v-navigation-drawer app v-model="isSideDrawerShow">
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
import ToolbarMenu from "./partials/ToolbarMenu";
export default {
  components: { ToolbarMenu, NavigationDrawerContent, FooterLayout },

  data() {
    return {
      isSideDrawerShow: true,
    };
  },
};
</script>
