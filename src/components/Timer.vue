<template>
    <b-container>
      
      <b-row class="pt-5">
        <b-col class="d-flex justify-content-center"><h3>{{ queryTimerInHours }}</h3></b-col>
      </b-row>
      
      <b-row class="pt-4">
        <b-col class="d-flex justify-content-center">
          <b-button size='lg' variant='outline-primary' v-on:click="commandChangeTimerState">
            {{ queryTimerNextState }}
          </b-button>
        </b-col>
        <b-col class="d-flex justify-content-center">
          <b-button size='lg'  variant='outline-secondary' v-on:click="commandResetTimer">
            Reset
          </b-button>
        </b-col>
      </b-row>
      
      <b-row class="pt-4">
        <b-col class="d-flex justify-content-center">
          <b-button size='lg' variant='outline-success' v-on:click="commandAddTimerRecord">
            Add
          </b-button>
        </b-col>
      </b-row>
     
      <b-row class="pt-5">
        <b-col>
          <table id="records" class="table">
            <tbody>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Action</th>
              </tr>
              <tr v-for="(value, index) in timerRecords" v-bind:key="index">
                <td>{{ value.dateOfRecord }}</td>
                <td>{{ value.timerInHours }}</td>
                <td class="d-flex justify-content-center">
                  <b-button size='sm' variant='outline-danger' v-on:click="commandRemoveTimerRecord(index)">Remove</b-button>
                </td>
              </tr>
            </tbody>
            </table>
        </b-col>
      </b-row>
    
    </b-container>   
</template>


<script>
//TODO : Computer Timer. laps. when i press start I register the amount of seconds so that when i stop the timer I know how many seconds the lap had. mkae sure if resset to negative value is added.
//TODO : Computer Timer. type of timer (plank,  pushups, running). when i press start I register the amount of seconds so that when i stop the timer I know how many seconds the lap had. mkae sure if resset to negative value is added.
//TODO : View Timer. view KPI accumulated during the day.
//Todo : Storing Record. ass type of record. add to object Records who produced the record.also expand to get timestamp with hours and minute. nto only day

import { ref, computed } from "@vue/composition-api";

export default {
  name: "Timer",

  props: {
    timerName: String,
  },

  mounted() {},

  setup() {
    //the number of seconds
    let timerSeconds = ref(0);

    let timerRecords = ref([]);

    //the state of the timer: inProgress, stopped
    let timerState = ref("stopped");

    const queryTimerInHours = computed(() => {
      var secs = timerSeconds.value;
      var hours = Math.floor(secs / (60 * 60));
      if (hours < 10) hours = `0${hours}`;

      var divisor_for_minutes = secs % (60 * 60);
      var minutes = Math.floor(divisor_for_minutes / 60);
      if (minutes < 10) minutes = `0${minutes}`;

      var divisor_for_seconds = divisor_for_minutes % 60;
      var seconds = Math.ceil(divisor_for_seconds);
      if (seconds < 10) seconds = `0${seconds}`;
      return `${hours}:${minutes}:${seconds}`;
    });

    let queryTimerNextState = computed(() => {
      if (timerState.value === "inProgress") return "Stop";
      if (timerState.value === "stopped") return "Start";
    });

    //changes the state of the timer. switching from start/stop.
    function commandChangeTimerState() {
      if (timerState.value === "stopped") timerState.value = "inProgress";
      else timerState.value = "stopped";

      commandTriggerTimer();
    }

    function commandResetTimer() {
      timerSeconds.value = 0;
    }

    function commandAddTimerRecord() {
      let today = new Date().toISOString().slice(0, 10);
      let value = queryTimerInHours.value;

      var record = {
        timerInHours: value,
        dateOfRecord: today,
      };

      timerRecords.value.push(record);
    }

    function commandRemoveTimerRecord(index) {
      timerRecords.value.splice(index, 1);
    }

    function commandTriggerTimer() {
      if (timerState.value === "inProgress") {
        setTimeout(() => {
          timerSeconds.value++;
          commandTriggerTimer();
        }, 1000);
      }
    }

    return {
      queryTimerInHours,
      queryTimerNextState,
      commandChangeTimerState,
      commandResetTimer,
      commandRemoveTimerRecord,
      commandAddTimerRecord,
      timerRecords,
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
