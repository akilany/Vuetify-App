<template>
  <div>
    <v-img height="450" :src="event.img" :lazy-src="event.img"></v-img>
    <v-btn absolute top right small color="warning" @click="editEvent">
      <v-icon>mdi-pencil</v-icon>
    </v-btn>

    <v-btn absolute top left small color="red" dark @click="dialog = true">
      <v-icon>mdi-delete</v-icon>
    </v-btn>

    <v-dialog v-model="dialog" max-width="390">
      <v-card>
        <v-card-title class="headline">Delete {{ event.title }}</v-card-title>

        <v-card-text>
          Are you sure you want to delete {{ event.title }}
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="darken-1" text @click="dialog = false">
            Cancel
          </v-btn>

          <v-btn
            color="red darken-1"
            text
            @click="deleteEvent(event.id)"
            :loading="loading"
          >
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-card-title>{{ event.title }}</v-card-title>

    <v-card-text>
      <v-row align="center" class="mx-0">
        <v-rating
          :value="event.rate"
          color="amber"
          dense
          half-increments
          readonly
          size="18"
        ></v-rating>

        <div class="grey--text ml-4">{{ event.rate }} (413)</div>
      </v-row>

      <div class="my-4 subtitle-1">
        $ {{ event.nationality }}, {{ event.category }}
      </div>

      <div>
        {{ event.description }}
      </div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-title v-if="event.date">
      Opens on {{ event.date | date }}
    </v-card-title>

    <v-subheader>Working hours:</v-subheader>
    <v-card-text v-if="event.time">
      <v-chip-group active-class="deep-purple accent-4 white--text" column>
        <v-chip>{{ event.time }}</v-chip>
      </v-chip-group>
    </v-card-text>
  </div>
</template>

<script>
import { mapState } from "vuex";
import date from "@/filters/date";
export default {
  props: ["id"],
  data() {
    return { dialog: false, loading: false };
  },
  computed: {
    ...mapState(["event"]),
  },
  methods: {
    editEvent() {
      this.$router.push({
        name: "EventEdit",
        params: { id: this.event.id },
      });
    },
    deleteEvent(id) {
      this.loading = true;
      this.$store
        .dispatch("deleteEvent", id)
        .then(() => {
          this.loading = false;
          this.dialog = false;
          this.$router.push({
            name: "EventList",
          });
        })
        .catch(() => {});
    },
  },
  created() {
    this.$store.dispatch("fetchEvent", this.id);
  },
  filters: {
    date,
  },
};
</script>

<style>
.v-subheader {
  margin-bottom: -1rem;
}
</style>
