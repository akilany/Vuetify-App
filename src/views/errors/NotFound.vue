<template>
  <v-card class="mx-auto my-5" flat max-width="344">
    <h1>Oops!</h1>
    <h3>The page you're looking for is not here :(</h3>
    <v-btn text color="primary" :to="{ name: 'EventList' }"
      >Back to the home page</v-btn
    >
  </v-card>
</template>

<script>
export default {};
</script>

<style></style>
