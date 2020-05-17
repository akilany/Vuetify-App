<template>
  <v-app id="app">
    <Navbar />
    <v-content>
      <v-container>
        <NotificationContainer />
        <router-view :key="$route.fullPath" />
      </v-container>
    </v-content>
    <Footer />
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NotificationContainer from "@/components/NotificationContainer";
export default {
  components: {
    Navbar,
    Footer,
    NotificationContainer
  }
};
</script>

<style lang="scss">
.container {
  padding-top: 0;
}
</style>
