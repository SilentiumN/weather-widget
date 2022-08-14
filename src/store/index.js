import { createStore } from "vuex";
import PositionServices from "@/services/position.services";
import WeatherServices from "@/services/weather.services";
import CountiesServices from "@/services/countries.services";

export default createStore({
  state() {
    return {
      latitude: 0,
      longitude: 0,
      weather: [],
      locations: [],
      countries: [],
      pageWeather: 0,
    };
  },

  modules: {},

  getters: {},

  mutations: {
    clearPageWeather(state, number) {
      console.log(state.pageWeather);
      state.pageWeather = number;
      console.log(state.pageWeather);
    },
    updatePageWeather(state, operation) {
      if (operation === "increment") {
        state.pageWeather += 1;
      } else if (operation === "reduction") {
        state.pageWeather -= 1;
      }
    },
    updateLocationsPosition(state, position) {
      console.log(position);
      let fromIndex = position.fromIndex;
      let toIndex = position.toIndex;
      let tempLocations = state.locations[fromIndex];
      state.locations[fromIndex] = state.locations[toIndex];
      state.locations[toIndex] = tempLocations;
    },
    updateWeatherPosition(state, position) {
      let fromIndex = position.fromIndex;
      let toIndex = position.toIndex;
      let tempWeather = state.weather[fromIndex];
      state.weather[fromIndex] = state.weather[toIndex];
      state.weather[toIndex] = tempWeather;
    },
    updateCountriesList(state, countries) {
      state.countries = countries;
    },
    updateCurrentLocation(state, coords) {
      state.latitude = coords.latitude;
      state.longitude = coords.longitude;
    },
    addLocation(state, result) {
      let newLocation = {
        id: result.id,
        country: result.sys.country,
        countryName: result.sys.countryName,
        city: result.name,
        unicodeFlag: result.sys.unicodeFlag,
      };
      state.locations.push(newLocation);
      console.log(newLocation);
    },
    deleteLocation(state, id) {
      console.log(id);
      let index = state.locations.findIndex((location) => location.id === id);
      if (index != -1) {
        state.locations.splice(index, 1);
      }
      console.log(state.locations);
    },
    addWeather(state, result) {
      console.log(result);
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

        console.log(
          timeInfo(result.sys.sunrise),
          timeInfo(result.dt),
          timeInfo(result.sys.sunset)
        );

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

      console.log(newWeather);
      state.weather.push(newWeather);
    },
    deleteWeather(state, id) {
      let index = state.weather.findIndex((weather) => weather.id === id);
      if (index != -1) {
        state.weather.splice(index, 1);
      }
      console.log(state.weather);
    },
  },

  actions: {
    async getLocalWeather({ commit, dispatch, state }) {
      dispatch("getLocalStorageLocation");
      if (state.locations.length === 0) {
        await PositionServices.getPosition()
          .then((result) => {
            let coords = {
              latitude: result.coords.latitude,
              longitude: result.coords.longitude,
            };
            commit("updateCurrentLocation", coords);
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
            commit("updateCurrentLocation", coords);
            console.log(
              "ERROR GET POSITION. " + "CODE: " + error.code,
              "MESSAGE: " +
                error.message +
                ". " +
                "SET DEFAULT LOCATION (VASHINGTON)."
            );
          });

        await WeatherServices.getCurrentWeather(
          { latitude: state.latitude, longitude: state.longitude },
          process.env.VUE_APP_OPEN_WEATHER_API_KEY
        ).then(async (result) => {
          let country = await CountiesServices.getNameCountry(
            result.sys.country
          );

          if ("data" in country) {
            result.sys.countryName =
              country.data.name + " " + country.data.unicodeFlag;
            result.sys.unicodeFlag = country.data.unicodeFlag;
            commit("addLocation", result);
            commit("addWeather", result);
            dispatch("setLocalStorageLocations");
          }
        });
      } else {
        let separateLocation = state.locations.slice(
          state.pageWeather * 2,
          (state.pageWeather + 1) * 2
        );
        for (const item of separateLocation) {
          await WeatherServices.getWeather(
            item.country,
            item.city,
            process.env.VUE_APP_OPEN_WEATHER_API_KEY
          ).then(async (result) => {
            let country = await CountiesServices.getNameCountry(
              result.sys.country
            );
            if ("data" in country) {
              result.sys.countryName =
                country.data.name + " " + country.data.unicodeFlag;
              result.sys.unicodeFlag = country.data.unicodeFlag;
              commit("addWeather", result);
            }
          });
        }
      }
    },
    setLocalStorageLocations({ state }) {
      localStorage.setItem("locations", JSON.stringify(state.locations));
    },
    getLocalStorageLocation({ state }) {
      let locations = localStorage.getItem("locations");
      if (locations != null) {
        state.locations = JSON.parse(locations);
      }
    },
    async getAllCountries({ state, commit }) {
      if (state.countries.length === 0) {
        await CountiesServices.getAllCountry().then((result) => {
          if (result.error === false) {
            commit("updateCountriesList", result.data);
          }
        });
      }
      console.log(state.countries);
      return state.countries;
    },
    async getCitiesFromCountry({}, country) {
      console.log("country", country);
      let cities = [];
      await CountiesServices.getCitiesFromCountry(country).then((result) => {
        console.log(result);
        if (result.error === false) {
          cities = result.data;
        }
      });
      return cities;
    },
    async addNewLocation({ state, commit, dispatch }, sendData) {
      let success = "error";
      await WeatherServices.getWeather(
        sendData.country,
        sendData.city,
        process.env.VUE_APP_OPEN_WEATHER_API_KEY
      ).then(async (result) => {
        console.log("weather", result);
        if (result.cod != 404) {
          let country = await CountiesServices.getNameCountry(
            result.sys.country
          );
          if ("data" in country) {
            result.sys.countryName =
              country.data.name + " " + country.data.unicodeFlag;
            result.sys.unicodeFlag = country.data.unicodeFlag;
            commit("addWeather", result);
            commit("addLocation", result);
            dispatch("setLocalStorageLocations");
            console.log("state", state);
            console.log("local", localStorage);
            success = "done"; //req success
            let maxPageWeather = Math.ceil(state.locations.length / 2) - 1;
            console.log(state.pageWeather, maxPageWeather);
            commit("clearPageWeather", maxPageWeather);
          }
        }
      });
      return success;
    },
    deleteWeather({ state, commit, dispatch }, id) {
      commit("deleteWeather", id);
      commit("deleteLocation", id);
      dispatch("setLocalStorageLocations");
      let maxPageWeather = Math.ceil(state.locations.length / 2) - 1;
      console.log(state.pageWeather, maxPageWeather);
      if (state.pageWeather > maxPageWeather) {
        commit("clearPageWeather", maxPageWeather);
      }
    },
    swapIndex({ commit, dispatch }, position) {
      commit("updateLocationsPosition", position);
      commit("updateWeatherPosition", position);
      dispatch("setLocalStorageLocations");
    },
    async getNewPageWeather({ commit, state }, operation) {
      commit("updatePageWeather", operation);
      if (state.weather.length < (state.pageWeather + 1) * 2 - 1) {
        let separateLocation = state.locations.slice(
          state.pageWeather * 2,
          (state.pageWeather + 1) * 2
        );
        for (const item of separateLocation) {
          await WeatherServices.getWeather(
            item.country,
            item.city,
            process.env.VUE_APP_OPEN_WEATHER_API_KEY
          ).then(async (result) => {
            let country = await CountiesServices.getNameCountry(
              result.sys.country
            );
            if ("data" in country) {
              result.sys.countryName =
                country.data.name + " " + country.data.unicodeFlag;
              result.sys.unicodeFlag = country.data.unicodeFlag;
              commit("addWeather", result);
            }
          });
        }
      }
      console.log("page", state.pageWeather);
      console.log("weather", state.weather);
    },
  },
});
