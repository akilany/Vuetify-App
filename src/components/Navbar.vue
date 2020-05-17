<template>
  <v-app-bar app dark flat color="primary">
    <v-btn text rounded :to="{ name: 'Home' }">Real World Vuetify</v-btn>
    <v-spacer></v-spacer>
    <v-btn text rounded :to="{ name: 'EventList' }">List</v-btn>
    <v-btn text rounded :to="{ name: 'EventCreate' }">Create</v-btn>
    <v-btn text rounded @click="toggleTheme">Toggle Theme</v-btn>
  </v-app-bar>
</template>

<script>
export default {
  methods: {
    toggleTheme() {
      this.$vuetify.theme.themes.dark.anchor = "#fff";
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
  },
};
</script>

<style></style>
