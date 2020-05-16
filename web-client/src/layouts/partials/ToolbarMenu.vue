<template>
  <v-menu offset-y open-on-hover>
    <template v-slot:activator="{ on }">
      <v-avatar color="primary" :size="35" v-on="on"></v-avatar>
    </template>
    <v-list>
      <v-list-item :to="{ name: 'login' }">Logout</v-list-item>
    </v-list>
  </v-menu>
</template>
<script>
export default {
  name: "toolbar-menu",
};
</script>
