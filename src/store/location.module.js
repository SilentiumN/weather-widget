import locationServices from "@/services/location.services";

export const locationModule = {
  namespaced: true,
  state() {
    return {
      latitude: 0,
      longitude: 0,
      locations: [],
      countries: [],
    };
  },

  getters: {
    locationLength (state) {
      return state.locations.length
    },
    locationPage (state, getters, rootState) {
      let pageWeather= rootState.weatherModule.pageWeather
      return state.locations.slice(
        pageWeather * 2,
        (pageWeather + 1) * 2
      )
    }
  },

  mutations: {
    UPDATE_LOCATION_INDEX(state, position) {
      let fromIndex = position.fromIndex;
      let toIndex = position.toIndex;
      let tempLocations = state.locations[fromIndex];
      state.locations[fromIndex] = state.locations[toIndex];
      state.locations[toIndex] = tempLocations;
    },
    UPDATE_COUTRIES_LIST(state, countries) {
      state.countries = countries;
    },
    UPDATE_LOCAL_LOCATION(state, coords) {
      state.latitude = coords.latitude;
      state.longitude = coords.longitude;
    },
    SET_LOCATION(state, data) {
      state.locations = data;
    },
    ADD_LOCATION(state, result) {
      let newLocation = {
        id: result.id,
        country: result.country,
        countryName: result.countryName,
        city: result.city,
        unicodeFlag: result.unicodeFlag,
      };
      state.locations.push(newLocation);
    },
    DELETE_LOCATION(state, id) {
      let index = state.locations.findIndex((location) => location.id === id);
      if (index != -1) {
        state.locations.splice(index, 1);
      }
    },
  },

  actions: {
    async getCitiesFromCountry({}, country) {
        let cities = [];
        await locationServices.getCitiesFromCountry(country).then((result) => {
          if (result.error === false) {
            cities = result.data;
          }
        });
        return cities;
      },
    async getAllCountries({ state, commit }) {
      if (state.countries.length === 0) {
        await locationServices.getAllCountry().then((result) => {
          if (result.error === false) {
            commit("UPDATE_COUTRIES_LIST", result.data);
          }
        });
      }
      return state.countries;
    },
    updateLocationIndex({ commit, dispatch }, position) {
      commit("UPDATE_LOCATION_INDEX", position);
      dispatch("setLocalStorageLocations");
    },
    deleteLocation({ commit, dispatch }, id) {
      commit("DELETE_LOCATION", id);
      dispatch("setLocalStorageLocations");
    },
    addNewLocation({ commit, dispatch }, location) {
      commit("ADD_LOCATION", location);
      dispatch("setLocalStorageLocations");
    },
    setLocalStorageLocations({ state }) {
      localStorage.setItem("locations", JSON.stringify(state.locations));
    },

    getLocalStorageLocation({ commit, state }) {
    if (state.locations.length === 0) {
        let locations = localStorage.getItem("locations");
        if (locations != null) {
          commit("SET_LOCATION", JSON.parse(locations));
        }
    }
    },

    async checkLocalStorageLocation({ commit, dispatch, state }) {
      dispatch("getLocalStorageLocation");

      if (state.locations.length === 0) {
        await locationServices
          .getPosition()
          .then((result) => {
            let coords = {
              latitude: result.coords.latitude,
              longitude: result.coords.longitude,
            };

            commit("UPDATE_LOCAL_LOCATION", coords);

            console.log(
              "SUCCESS GET POSITION.",
              "LATITUDE =",
              state.latitude,
              "LONGTITUDE =",
              state.longitude
            );
          })

          .catch((error) => {
            let coords = {
              latitude: 44.5,
              longitude: -89.5,
            };
            commit("UPDATE_LOCAL_LOCATION", coords);
            console.log(
              "ERROR GET POSITION. " + "CODE: " + error.code,
              "MESSAGE: " +
                error.message +
                ". " +
                "SET DEFAULT LOCATION (WASHINGTON)."
            );
          });
      }
    },
  },
};
