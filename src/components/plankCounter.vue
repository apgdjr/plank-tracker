<template>
  <b-container>
    <b-row class="pt-4">
      <b-col class="d-flex justify-content-center">
        <h3>{{ queryCounterInHours }}</h3>
      </b-col>
    </b-row>

    <b-row>
      <b-col class="d-flex justify-content-center">
        <div v-if="checkIsStopped">
          <b-button
            size="lg"
            variant="outline-primary"
            v-on:click="commandStartCounter"
          >
            Start
          </b-button>
        </div>

        <div v-if="!checkIsStopped">
          <b-button
            size="lg"
            variant="outline-primary"
            v-on:click="commandStopCounter"
          >
            Stop
          </b-button>
        </div>
      </b-col>

      <b-col class="d-flex justify-content-center">
        <b-button
          size="lg"
          variant="outline-secondary"
          v-on:click="commandResetCounter"
          :disabled="!checkIsStopped"
        >
          Reset
        </b-button>
      </b-col>
    </b-row>
  </b-container>
</template>


<script>
//TODO : Computer Timer. laps. when i press start I register the amount of seconds so that when i stop the timer I know how many seconds the lap had. mkae sure if resset to negative value is added.
//TODO : Computer Timer. type of timer (plank,  pushups, running). when i press start I register the amount of seconds so that when i stop the timer I know how many seconds the lap had. mkae sure if resset to negative value is added.
//TODO : View Timer. view KPI accumulated during the day.
//Todo : Storing Record. ass type of record. add to object Records who produced the record.also expand to get timestamp with hours and minute. nto only day

import { computed } from "@vue/composition-api";

export default {
  name: "plankCounter",

  setup(props, context) {
    const store = context.root.$store;

    const checkIsStopped = computed(() => {
      if (queryCounterStatus.value === "stopped") {
        //console.log('checkIsStopped: ', queryCounterStatus, true)
        return true;
      } else {
        //console.log('checkIsStopped: ', queryCounterStatus, false)
        return false;
      }
    });

    const queryCounterInHours = computed(() => {
      var secs = store.get("counter.counter");
      var hours = Math.floor(secs / (60 * 60));
      if (hours < 10) hours = `0${hours}`;

      var divisor_for_minutes = secs % (60 * 60);
      var minutes = Math.floor(divisor_for_minutes / 60);
      if (minutes < 10) minutes = `0${minutes}`;

      var divisor_for_seconds = divisor_for_minutes % 60;
      var seconds = Math.ceil(divisor_for_seconds);
      if (seconds < 10) seconds = `0${seconds}`;

      const value = `${hours}:${minutes}:${seconds}`;

      console.log("storing... , ", value);
      store.set("counter/counterInHours", value);

      return value;
    });

    const queryCounterStatus = computed(() => {
      return store.get("counter.state");
    });

    //changes the state of the timer. switching from start/stop.
    function commandStartCounter() {
      store.set("counter/state", "inProgress");
      commandTickCounter();
    }

    //changes the state of the timer. switching from start/stop.
    function commandStopCounter() {
      store.set("counter/state", "stopped");
    }

    function commandResetCounter() {
      store.set("counter/counter", 0);
    }

    function commandTickCounter() {
      if (store.get("counter.state") === "inProgress") {
        setTimeout(() => {
          //before adding to timer make sure that it is still in progress
          if (store.get("counter.state") === "inProgress") {
            let value = store.get("counter.counter");
            value = value + 1;
            console.log("Counter Tick", value);
            store.set("counter/counter", value++);

            commandTickCounter();
          }
        }, 1000);
      }
    }

    return {
      queryCounterInHours,
      queryCounterStatus,
      checkIsStopped,
      commandStartCounter,
      commandStopCounter,
      commandResetCounter,
    };
  },
};
</script>


<style>
#records {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

#records td,
#customers th {
  border: 1px solid #ddd;
  padding: 8px;
}

#records tr:nth-child(even) {
  background-color: #f2f2f2;
}

#records tr:hover {
  background-color: #ddd;
}

#records th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #4CAF50;
  color: white;
}
</style>
