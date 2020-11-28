import Vue from "vue";
import Vuex from "vuex";
import pathify from "vuex-pathify";
import database from "./modules/database.js";
import counter from "./modules/counter.js";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [pathify.plugin],
  modules: { database: database, counter: counter }
});
