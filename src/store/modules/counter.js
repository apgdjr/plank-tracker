import { make } from "vuex-pathify";

const state = {
  counter: 0,
  counterInHours: "00:00:00",
  state: "stopped"
};

const mutations = make.mutations(state);

export default {
  namespaced: true,
  state,
  mutations,
  actions: {},
  getters: {}
};
