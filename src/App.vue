<template>
  <Timer />
</template>

<script>
//import TimerVue from "./components/Timer.vue";
import Timer from "./components/Timer.vue";

export default {
  name: "App",
  components: {
    Timer: Timer,
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