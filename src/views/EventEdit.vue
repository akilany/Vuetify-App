<template>
  <v-form @submit.prevent="updateEvent">
    <v-img height="350" :src="event.img" :lazy-src="event.img"></v-img>

    <v-card-title>Update {{ event.title }}</v-card-title>

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
    <v-text-field
      label="Place Name"
      outlined
      rounded
      v-model="event.title"
      required
    ></v-text-field>
    <v-row>
      <v-col md="6" cols="12">
        <v-autocomplete
          label="Nationality"
          :items="$store.state.nationalities"
          outlined
          rounded
          v-model="event.nationality"
        ></v-autocomplete>
      </v-col>
      <v-col md="6" cols="12">
        <v-autocomplete
          label="Category"
          :items="$store.state.categories"
          outlined
          rounded
          v-model="event.category"
        ></v-autocomplete>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6">
        <v-menu
          ref="date"
          v-model="dateModel"
          :close-on-content-click="false"
          :return-value.sync="event.date"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="event.date"
              label="Date"
              readonly
              outlined
              rounded
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="event.date" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="dateModel = false"
              >Cancel</v-btn
            >
            <v-btn text color="primary" @click="$refs.date.save(event.date)"
              >OK</v-btn
            >
          </v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="12" md="6">
        <v-menu
          ref="time"
          v-model="timeModel"
          :close-on-content-click="false"
          :nudge-right="40"
          :return-value.sync="event.time"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="event.time"
              label="Time"
              readonly
              outlined
              rounded
              v-on="on"
            ></v-text-field>
          </template>
          <v-time-picker
            v-if="timeModel"
            v-model="event.time"
            full-width
            @click:minute="$refs.time.save(event.time)"
          ></v-time-picker>
        </v-menu>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6">
        <v-text-field
          label="Rate"
          readonly
          outlined
          rounded
          v-model="event.rate"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-rating
          :value="event.rate"
          color="amber"
          half-increments
          size="40"
          hover
          v-model="event.rate"
        ></v-rating>
      </v-col>
    </v-row>

    <v-textarea
      label="Description"
      auto-grow
      outlined
      rounded
      rows="5"
      v-model="event.description"
    ></v-textarea>
    <v-btn
      type="submit"
      color="primary"
      block
      rounded
      :loading="loading"
      class="my-4"
      >Update</v-btn
    >
  </v-form>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: ["id"],
  data() {
    return {
      dateModel: false,
      timeModel: false,
      dialog: false,
      loading: false,
    };
  },
  methods: {
    updateEvent() {
      this.loading = true;
      this.$store
        .dispatch("updateEvent", { id: this.id, event: this.event })
        .then(() => {
          this.$router.push({
            name: "EventShow",
            params: { id: this.id },
          });
          this.loading = false;
        })
        .catch(() => {});
    },
    deleteEvent(id) {
      this.loading = true;
      this.$store
        .dispatch("deleteEvent", id)
        .then(() => {
          this.dialog = false;
          this.$router.push({
            name: "EventList",
          });
          this.loading = false;
        })
        .catch(() => {});
    },
  },
  computed: {
    ...mapState(["event"]),
  },
  created() {
    this.$store.dispatch("fetchEvent", this.id);
  },
};
</script>

<style lang="scss"></style>
