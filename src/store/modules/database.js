import { make } from "vuex-pathify";

const state = {
  planks: [],
  userID: "99f1d613-097a-4df2-8ad5-9ec855e1be62",
  timer: "00:00:00",
  userList: [
    "991a602c-b853-4a86-83f8-4627721f1b6f",
    "99f1d613-097a-4df2-8ad5-9ec855e1be62"
  ]
};

const mutations = make.mutations(state);

export default {
  namespaced: true,
  state,
  mutations,
  actions: {},
  getters: {}
};
