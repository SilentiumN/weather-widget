import weatherServices from "@/services/weather.services";
import locationServices from "@/services/location.services";

export const weatherModule = {
  namespaced: true,
  state() {
    return {
      weather: [],
      pageWeather: 0,
      compactSizeCard: false
    };
  },

  getters: {
    weatherLength (state) {
      return state.weather.length
    },
    weatherPage (state) {
      return state.weather.slice(
        state.pageWeather * 2,
        (state.pageWeather + 1) * 2
      )
    }
  },

  actions: {
    changeSizeCard({commit, dispatch}) {
      commit('CHANGE_SIZE_CARD');
      dispatch('setLocalStorageSize')
    },
    async updatePageWeather({commit, rootState, state, dispatch}, operation) {
        commit('UPDATE_PAGE_WEATHER', operation)
        if (state.weather.length < (state.pageWeather + 1) * 2 - 1) {
            let separateLocation = rootState.locationModule.locations.slice(
              state.pageWeather * 2,
              (state.pageWeather + 1) * 2
            );
            for (const item of separateLocation) {
              await weatherServices.getWeather(
                item.country,
                item.city
              ).then(async (result) => {
                dispatch('saveWeather', result)
              });
            }
          }
      },
    async addNewWeather({ state, dispatch, commit, rootState }, sendData) {
      let res_data = { success: "error", msg: "" };
      let checkExistedCity = rootState.locationModule.locations.find(
        (location) =>
        location.city === sendData.city &&
          location.country === sendData.country
      );
      let location = null

      if (checkExistedCity === undefined) {
        await weatherServices
          .getWeather(
            sendData.country,
            sendData.city
          )
          .then(async (result) => {
            if (result.cod != 404) {
              location = await dispatch("saveWeather", result);
              res_data["success"] = "done";
              res_data["msg"] = sendData.city + " successfully added";
              let maxPageWeather = Math.ceil(state.weather.length / 2) - 1;
              commit("SET_NEW_PAGE_WEATHER", maxPageWeather);
            } else {
              res_data["success"] = "error";
              res_data["msg"] = sendData.city + " not found in WeatherAPI";
            }
          });
      } else {
        res_data["success"] = "error";
        res_data["msg"] = sendData.city + " already addedd in your list";
      }

      return {res_data: res_data, location: location};
    },
    async getWeather({ rootState, state, dispatch }) {
      let locationsModule = rootState.locationModule;
      let newLocation = null;

      if (locationsModule.locations.length != 0) {
        let separateLocation = locationsModule.locations.slice(
          state.pageWeather * 2,
          (state.pageWeather + 1) * 2
        );

        for (const item of separateLocation) {
          await weatherServices
            .getWeather(
              item.country,
              item.city
            )
            .then(async (result) => {
              newLocation = await dispatch("saveWeather", result);
            });
        }
      } else if (
        locationsModule.locations.length === 0 &&
        locationsModule.latitude != 0 &&
        locationsModule.longitude != 0
      ) {
        await weatherServices
          .getCurrentWeather(
            {
              latitude: locationsModule.latitude,
              longitude: locationsModule.longitude,
            }
          )
          .then(async (result) => {
            newLocation = await dispatch("saveWeather", result);
          });
      }
      return newLocation;
    },
    async saveWeather({ commit }, result) {
      let country = await locationServices.getNameCountry(result.sys.country);

      if ("data" in country) {
        result.sys.countryName =
          country.data.name + " " + country.data.unicodeFlag;
        result.sys.unicodeFlag = country.data.unicodeFlag;
        commit("ADD_WEATHER", result);

        let newLocation = {
          id: result.id,
          country: result.sys.country,
          countryName: result.sys.countryName,
          city: result.name,
          unicodeFlag: result.sys.unicodeFlag,
        };

        return newLocation;
      }
    },
    deleteWeather({ rootState, state, commit }, id) {
      let locations = rootState.locationModule.locations;
      commit("DELETE_WEATHER", id);
      let maxPageWeather = Math.ceil(locations.length / 2) - 1;
      if (state.pageWeather > maxPageWeather) {
        commit("SET_NEW_PAGE_WEATHER", maxPageWeather);
      }
    },

    updateWeatherIndex({ commit }, position) {
      commit("UPDATE_WEATHER_INDEX", position);
    },
    setLocalStorageSize({ state }) {
      localStorage.setItem("compactSizeCard", state.compactSizeCard);
    },
    getLocalStorageSize({ commit }) {
      let compactSizeValue = localStorage.getItem("compactSizeCard");
      if (compactSizeValue != null) {
        commit("SET_SIZE_CARD", compactSizeValue);
      }
    }
  },

  mutations: {
    SET_NEW_PAGE_WEATHER(state, number) {
      state.pageWeather = number;
    },

    UPDATE_PAGE_WEATHER(state, operation) {
      if (operation === "increment") {
        state.pageWeather += 1;
      } else if (operation === "reduction") {
        state.pageWeather -= 1;
      }
    },

    UPDATE_WEATHER_INDEX(state, position) {
      let fromIndex = position.fromIndex;
      let toIndex = position.toIndex;
      let tempWeather = state.weather[fromIndex];
      state.weather[fromIndex] = state.weather[toIndex];
      state.weather[toIndex] = tempWeather;
    },

    ADD_WEATHER(state, result) {
      let windDirection = [
        "N",
        "NNE",
        "NE",
        "ENE",
        "E",
        "ESE",
        "SE",
        "SSE",
        "S",
        "SSW",
        "SW",
        "WSW",
        "W",
        "WNW",
        "NW",
        "NNW",
        "W",
      ];

      function correctionTime(number) {
        let newNumber = "00";
        if (number < 10) {
          newNumber = "0" + number;
        } else if (number >= 10) {
          newNumber = number;
        }
        return newNumber;
      }

      function getDate(date) {
        let newDate = new Date((date + result.timezone) * 1000);
        return (
          correctionTime(newDate.getUTCHours()) +
          ":" +
          correctionTime(newDate.getUTCMinutes())
        );
      }

      function weatherBackground() {
        let time = "";
        let weather = "";
        let timeInfo = function getTime(date) {
          return new Date(date).getTime();
        };

        if (
          timeInfo(result.sys.sunrise) <= timeInfo(result.dt) &&
          timeInfo(result.dt) <= timeInfo(result.sys.sunset)
        ) {
          time = "day";
        } else {
          time = "night";
        }

        weather = result.weather[0].main.toLowerCase();

        if (
          weather != "rain" &&
          weather != "thunderstorm" &&
          weather != "drizzle" &&
          weather != "atmosphere"
        ) {
          return weather + time;
        } else if (weather === "drizzle") {
          return "rain";
        } else {
          return weather;
        }
      }

      let newWeather = {
        id: result.id,

        icon: result.weather[0].icon,

        tempCurrent: Math.round(result.main.temp) + "°",
        tempFeels: Math.round(result.main.feels_like) + "°",
        tempMin: Math.round(result.main.temp_min) + "°",
        tempMax: Math.round(result.main.temp_max) + "°",

        weatherMain: result.weather[0].main,
        weatherBackground: weatherBackground(),
        weatherDsc: result.weather[0].description,

        windDeg: result.wind.deg,
        windDirection: windDirection[Math.ceil(result.wind.deg / 22.5)],
        windSpeed: result.wind.speed + "km/h",

        sunrise: getDate(result.sys.sunrise),
        sunset: getDate(result.sys.sunset),
        currentTime: getDate(result.dt),
        city: result.name + " " + result.sys.unicodeFlag,
        country: result.sys.countryName,

        visibility: result.visibility / 1000 + "km",
        humidity: result.main.humidity + "%",
        pressure: Math.round(result.main.pressure * 0.750062),
      };

      state.weather.push(newWeather);
    },

    DELETE_WEATHER(state, id) {
      let index = state.weather.findIndex((weather) => weather.id === id);
      if (index != -1) {
        state.weather.splice(index, 1);
      }
    },
    CHANGE_SIZE_CARD(state) {
      state.compactSizeCard = !state.compactSizeCard
    },
    SET_SIZE_CARD(state, sizeCardValue) {
      state.compactSizeCard = sizeCardValue
    }

  },
};
