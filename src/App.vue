<template>
  <Timer timerName="Timer 1" />
</template>

<script>
import TimerVue from "./components/Timer.vue";

export default {
  name: "App",
  components: {
    Timer: TimerVue,
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