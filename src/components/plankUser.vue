<template>
  <b-container>
    <b-row class="pt-4">
      <b-col class="d-flex justify-content-center">
        <b-form-select v-model="userID" :options="queryUsers"></b-form-select>
      </b-col>
    </b-row>
  </b-container>
</template>


<script>
import { computed, ref, watch } from "@vue/composition-api";
import { loadPlank } from "../firebase.js";

export default {
  name: "plankUser",

  setup(props, context) {
    const store = context.root.$store;
    let userID = ref("a");

    watch(userID, (newValue, oldValue) => {
      console.log("The new value is value is: " + userID.value);
      store.set("database/userID", userID.value);
      loadPlank();
    });

    const queryUsers = computed(() => {
      return store.get("database.userList");
    });

    return {
      queryUsers,
      userID,
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
