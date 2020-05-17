<template>
  <div class="home">
    <div class="banner"></div>
    <v-btn
      rounded
      large
      :to="{ name: 'EventList' }"
      color="primary"
      class="mr-4"
      >List</v-btn
    >
    <v-btn rounded large :to="{ name: 'EventCreate' }">Create a place</v-btn>
  </div>
</template>

<script>
export default {};
</script>

<style>
.home {
  height: 700px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
}
.banner {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url("../../public/bg.jpg");
  background-size: cover;
}
</style>
