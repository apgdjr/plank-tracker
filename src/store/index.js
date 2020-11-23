import Vue from "vue";
import Vuex from "vuex";
import pathify, { make } from "vuex-pathify";
import database from "./modules/database.js";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [pathify.plugin],
  modules: { database: database }
});
