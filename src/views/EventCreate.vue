<template>
  <v-form @submit.prevent="createEvent" v-model="formValidity">
    <h1 class="my-4">Add a place</h1>
    <v-text-field
      label="Place Name"
      outlined
      rounded
      v-model="event.title"
      :rules="rules"
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
          :rules="rules"
          required
        ></v-autocomplete>
      </v-col>
      <v-col md="6" cols="12">
        <v-autocomplete
          label="Category"
          :items="$store.state.categories"
          outlined
          rounded
          v-model="event.category"
          :rules="rules"
          required
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
              :rules="rules"
              required
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
              :rules="rules"
              required
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

    <!--
    <v-file-input
      label="Attach Image"
      outlined
      rounded
      v-model="event.img"
    ></v-file-input>
    -->

    <v-row>
      <v-col cols="12" md="6">
        <v-text-field
          label="Rate"
          readonly
          outlined
          rounded
          v-model="event.rate"
          :rules="rules"
          required
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
      :rules="rules"
      required
    ></v-textarea>
    <v-btn
      type="submit"
      color="primary"
      block
      rounded
      :loading="loading"
      class="my-4"
      :disabled="!formValidity"
    >
      Submit

      <template v-slot:loader>
        <span>Loading...</span>
      </template>
    </v-btn>
  </v-form>
</template>

<script>
export default {
  data() {
    return {
      event: this.createEventObject(),
      dateModel: false,
      timeModel: false,
      loading: false,
      rules: [(value) => !!value || "This field is required."],
      formValidity: false,
    };
  },
  methods: {
    createEvent() {
      this.loading = true;
      this.$store
        .dispatch("createEvent", this.event)
        .then(() => {
          this.loading = false;
          this.$router.push({
            name: "EventShow",
            params: { id: this.event.id },
          });
          this.event = this.createEventObject();
        })
        .catch(() => {});
    },
    createEventObject() {
      const id = Math.floor(Math.random() * 1000000);
      return {
        id: id,
        title: "",
        rate: 0,
        description: "",
        nationality: "",
        category: "",
        data: "",
        time: "",
        img: `https://source.unsplash.com/random/${id}`,
      };
    },
  },
  computed: {},
};
</script>

<style lang="scss"></style>
