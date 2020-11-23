<template>
  <div>
    <Timer />
    <Table />
    <User />
  </div>
</template>

<script>
//import TimerVue from "./components/Timer.vue";
import plankUser from "./components/plankUser.vue";
import plankTable from "./components/plankTable.vue";
import plankTimer from "./components/plankTimer.vue";

export default {
  name: "App",
  components: {
    User: plankUser,
    Timer: plankTimer,
    Table: plankTable,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>