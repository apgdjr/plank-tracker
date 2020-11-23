import { make } from "vuex-pathify";

const state = {
  planks: [],
  userID: "991a602c-b853-4a86-83f8-4627721f1b6f",
  timer: "00:00:00"
};

const mutations = make.mutations(state);

export default {
  namespaced: true,
  state,
  mutations,
  actions: {},
  getters: {}
};
