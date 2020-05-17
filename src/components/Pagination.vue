<template>
  <div class="pagination">
    <v-btn
      :disabled="page === 1"
      :to="{ name: 'EventList', query: { page: page - 1 } }"
      rel="prev"
      small
      fab
      elevation="0"
      class="mr-2"
    >
      <v-icon>mdi-chevron-left</v-icon>
    </v-btn>
    <v-btn
      v-for="page in pages"
      :key="page + 'p'"
      :to="{ name: 'EventList', query: { page: page } }"
      small
      fab
      elevation="0"
      class="mr-2"
      :color="page === $route.query.page ? 'primary' : ''"
    >
      {{ page }}
    </v-btn>
    <v-btn
      :disabled="!(eventsTotal > page * 6)"
      :to="{ name: 'EventList', query: { page: page + 1 } }"
      rel="next"
      small
      fab
      elevation="0"
    >
      <v-icon>mdi-chevron-right</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  props: ["page", "eventsTotal", "pages"],
};
</script>

<style></style>
