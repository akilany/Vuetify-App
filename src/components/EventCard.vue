<template>
  <v-card>
    <v-img height="250" :src="event.img" :lazy-src="event.img"></v-img>
    <v-btn absolute top right small fab color="warning" @click="editEvent">
      <v-icon>mdi-pencil</v-icon>
    </v-btn>
    <v-btn absolute top left fab small color="red" dark @click="dialog = true">
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
          size="14"
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

    <v-card-actions>
      <v-btn
        color="deep-purple lighten-2"
        text
        :to="{ name: 'EventShow', params: { id: event.id } }"
        >Discover</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    event: Object,
    eventIndex: Number,
    events: Array,
  },
  data() {
    return {
      dialog: false,
      loading: false,
    };
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
          this.events.splice(this.eventIndex, 1);
          this.loading = false;
          this.dialog = false;
        })
        .catch(() => {});
    },
  },
};
</script>

<style></style>
