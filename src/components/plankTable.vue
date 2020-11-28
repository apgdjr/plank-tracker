<template>
  <b-container>
    <b-row class="pt-4">
      <b-col class="d-flex justify-content-center">
       <div v-if="!checkIsAddDisabled">  
        <b-button
          size="lg"
          variant="outline-success"
          v-on:click="pressedButtonAdd"
         
        >
          Add         
        </b-button>
      </div>
      </b-col>
    </b-row>

    <b-row class="pt-5">
      <b-col>
        <table id="records" class="table" v-if="counterRecords.length > 0">
          <tbody>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Action</th>
            </tr>
            <tr v-for="(value, index) in counterRecords" v-bind:key="index">
              <td>{{ value.data.dateOfRecord }}</td>
              <td>{{ value.data.timerInHours }}</td>
              <td class="d-flex justify-content-center">
                <b-button
                  size="sm"
                  variant="outline-danger"
                  v-on:click="commandRemoveCounterRecord(index)"
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
import {firedb} from "../firebase.js";

export default {
  name: "plankTable",

  setup(props, context) {
    const store = context.root.$store;

    const loading = ref(true);
    const error = ref(null);

    const counterRecords = computed(() => store.get("database.planks"));
    const userID = computed(() => store.get("database.userID"));
    const queryCounterInHours = computed(() => store.get("counter.counterInHours"));
    const checkIsAddDisabled = computed(
    () => {
      if ((store.get("counter.state") === 'stopped') & ((store.get("counter.counter") > 0))){
        
        return false
      }
      else 
        return true
    }
    )
    onMounted(() => {
      loading.value = false;
    });

    function pressedButtonAdd() {
      commandAddCounterRecord();
      store.set("counter/counter", 0);
    }

    function commandAddCounterRecord() {
      let today = new Date().toISOString().slice(0, 10);
      let value = queryCounterInHours.value;
      console.log("here", firedb);
 
      var newPlankKey = firedb.ref().child("Users/" + userID.value + "/planks").push().key;

      console.log("here 2", newPlankKey);

      let record = {
        id: newPlankKey,
        data: {
          timerInHours: value,
          dateOfRecord: today,
        },
      };

      firedb.ref("Users/" + userID.value + "/planks/" + record.id).set(record.data);
    }

    function commandRemoveCounterRecord(index) {
      let object = counterRecords.value[index];
      //console.log(index, object.id)
      firedb.ref("Users/" + userID.value + "/planks/" + object.id).remove();
    }

    return {
      queryCounterInHours,
      commandRemoveCounterRecord,
      pressedButtonAdd,
      userID,
      checkIsAddDisabled,
      counterRecords,
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
