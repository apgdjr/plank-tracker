<template>
  <b-container>
    <b-row class="pt-4">
      <b-col class="d-flex justify-content-center">
        <b-button
          size="lg"
          variant="outline-primary"
          v-on:click="commandChangeTimerState"
        >
          {{ queryTimerNextState }}
        </b-button>
      </b-col>

      <b-col class="d-flex justify-content-center">
        <h3>{{ queryTimerInHours }}</h3>
      </b-col>

      <b-col class="d-flex justify-content-center">
        <b-button
          size="lg"
          variant="outline-secondary"
          v-on:click="commandResetTimer"
        >
          Reset
        </b-button>
      </b-col>
    </b-row>

    <b-row class="pt-4">
      <b-col class="d-flex justify-content-center">
        <b-button
          size="lg"
          variant="outline-success"
          v-on:click="pressedButtonAdd"
        >
          Add <br />
          {{ queryLapInHours }}
        </b-button>
      </b-col>
    </b-row>

    <b-row class="pt-5">
      <b-col>
        <table id="records" class="table" v-if="timerRecords.length > 0">
          <tbody>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Action</th>
            </tr>
            <tr v-for="(value, index) in timerRecords" v-bind:key="index">
              <td>{{ value.data.dateOfRecord }}</td>
              <td>{{ value.data.timerInHours }}</td>
              <td class="d-flex justify-content-center">
                <b-button
                  size="sm"
                  variant="outline-danger"
                  v-on:click="commandRemoveTimerRecord(index)"
                  >Remove</b-button
                >
              </td>
            </tr>
          </tbody>
        </table>

        <p v-if="loading">Still loading..</p>
        <p v-if="error">Error Loading</p>
      </b-col>
    </b-row>
  </b-container>
</template>


<script>
//TODO : Computer Timer. laps. when i press start I register the amount of seconds so that when i stop the timer I know how many seconds the lap had. mkae sure if resset to negative value is added.
//TODO : Computer Timer. type of timer (plank,  pushups, running). when i press start I register the amount of seconds so that when i stop the timer I know how many seconds the lap had. mkae sure if resset to negative value is added.
//TODO : View Timer. view KPI accumulated during the day.
//Todo : Storing Record. ass type of record. add to object Records who produced the record.also expand to get timestamp with hours and minute. nto only day

import { ref, computed, onMounted } from "@vue/composition-api";
import fire from "../firebase.js";

export default {
  name: "Timer",

  props: {
    timerName: String,
  },

  mounted() {},

  setup() {
    const loading = ref(true);
    const error = ref(null);

    async function fetchData() {
      const itemsRef = fire
        .database()
        .ref("Users/991a602c-b853-4a86-83f8-4627721f1b6f/planks");

      itemsRef.once("value", (snapshot) => {
        let data = snapshot.val();

        let records = [];
        // loop over values
        for (let key of Object.keys(data)) {
          records.push({id: key, data: data[key]});
          loading.value = false;
        }
        timerRecords.value = records;
      });
    }

    onMounted(() => {
      fetchData();
    });

    //the number of seconds
    let timerSeconds = ref({ current: 0, previous: 0, lap: 0 });

    let timerRecords = ref([]);
    //the state of the timer: inProgress, stopped
    let timerState = ref("stopped");

    const queryTimerInHours = computed(() => {
      var secs = timerSeconds.value.current;
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

    const queryLapInHours = computed(() => {
      var secs = timerSeconds.value.current - timerSeconds.value.previous;
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
      if (timerState.value === "stopped") {
        timerState.value = "inProgress";
        commandNewLap();
        commandTriggerTimer();
      } else {
        timerState.value = "stopped";
      }
    }

    function commandResetTimer() {
      timerSeconds.value.current = 0;
      timerSeconds.value.previous = 0;
    }

    function commandNewLap() {
      timerSeconds.value.previous = timerSeconds.value.current;
    }

    function pressedButtonAdd() {
      commandAddTimerRecord();
      commandNewLap();
    }

    function commandAddTimerRecord() {
      let today = new Date().toISOString().slice(0, 10);
      let value = queryLapInHours.value;

      var newPlankKey = fire
        .database()
        .ref()
        .child("Users/991a602c-b853-4a86-83f8-4627721f1b6f/planks")
        .push().key;
      
      var record = {
        id: newPlankKey,
        data: {
          timerInHours: value,
          dateOfRecord: today,
        }
      };

   
      
      fire
        .database()
        .ref("Users/991a602c-b853-4a86-83f8-4627721f1b6f/planks/" + record.id)
        .set(record.data);

      timerRecords.value.push(record);      

      
    }

    function commandRemoveTimerRecord(index) {
      
      let object = timerRecords.value[index];
      //console.log(index, object.id)
      fire.database().ref("Users/991a602c-b853-4a86-83f8-4627721f1b6f/planks/"+object.id).remove();
      timerRecords.value.splice(index, 1);

    }

    function commandTriggerTimer() {
      if (timerState.value === "inProgress") {
        setTimeout(() => {
          //before adding to timer make sure that it is still in progress
          if (timerState.value === "inProgress") {
            timerSeconds.value.current++;
            commandTriggerTimer();
          }
        }, 1000);
      }
    }

    return {
      queryTimerInHours,
      queryLapInHours,
      queryTimerNextState,

      commandChangeTimerState,
      commandResetTimer,
      commandRemoveTimerRecord,
      pressedButtonAdd,

      timerRecords,
      loading,
      error,
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
