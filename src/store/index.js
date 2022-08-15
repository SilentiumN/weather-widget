import { createStore } from "vuex";
import { locationModule } from "./location.module";
import { weatherModule } from "./weather.module";

export default createStore({
  state() {
    return {};
  },

  modules: {
    locationModule: locationModule,
    weatherModule: weatherModule,
  },

  getters: {},

  mutations: {},

  actions: {
  },
});
