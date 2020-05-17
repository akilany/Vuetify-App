<template>
  <div class="alert">
    <Notification
      v-for="notification in notifications"
      :key="notification.id"
      :notification="notification"
    />
  </div>
</template>

<script>
import Notification from "@/components/Notification";
import { mapState } from "vuex";
export default {
  components: {
    Notification,
  },
  computed: {
    ...mapState("notification", ["notifications"]),
  },
};
</script>

<style></style>
