<template>
  <v-alert
    :type="notification.type"
    prominent
    text
    outlined
    dense
    border="left"
  >
    <v-row align="center">
      <v-col class="grow">
        {{ notification.message }}
      </v-col>
      <v-col class="shrink">
        <v-btn :color="notification.type" @click="removeNotification">
          Close
        </v-btn>
      </v-col>
    </v-row>
  </v-alert>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: {
    notification: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      alert: true,
      timeout: null,
    };
  },
  methods: {
    ...mapActions("notification", ["remove"]),
    removeNotification() {
      this.remove(this.notification);
    },
  },
  mounted() {
    this.timeout = setTimeout(() => this.remove(this.notification), 5000);
  },
  beforeDestroy() {
    clearTimeout(this.timeout);
  },
};
</script>

<style lang="scss">
.alert {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  z-index: 999;
}
</style>
