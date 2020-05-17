<template>
  <div class="list">
    <v-row>
      <v-col
        cols="12"
        md="4"
        sm="6"
        class="my-3"
        v-for="(event, index) in events"
        :key="event.id"
      >
        <EventCard
          :event="event"
          :eventIndex="index"
          :events="events"
          :page="page"
        />
      </v-col>
    </v-row>
    <pagination :page="page" :eventsTotal="eventsTotal" :pages="pages" />
  </div>
</template>

<script>
import EventCard from "@/components/EventCard";
import Pagination from "@/components/Pagination";
import { mapState } from "vuex";
export default {
  data() {
    return {
      p: 1,
    };
  },
  components: {
    EventCard,
    Pagination,
  },
  computed: {
    pages() {
      return Math.ceil(this.eventsTotal / 6);
    },
    page() {
      return parseInt(this.$route.query.page) || 1;
    },
    ...mapState(["events", "eventsTotal"]),
  },
  created() {
    this.$store.dispatch("fetchEvents", {
      perPage: 6,
      page: this.page,
    });
  },
};
</script>

<style lang="scss">
.list {
  display: flex;
  flex-direction: column;
  .pagination {
    margin: 1rem 0;
    align-self: center;
  }
}
</style>
