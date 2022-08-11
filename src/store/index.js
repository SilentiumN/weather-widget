import {createStore} from "vuex";
import PositionServices from "@/services/position.services";
import WeatherServices from "@/services/weather.services";
import CountiesServices from "@/services/countries.services";

export default createStore({
    state() {
        return {
            latitude: 0,
            longitude: 0,
            weather: [],
            locations: []
        }
    },

    modules: {},

    getters: {

    },

    mutations: {
        updateCurrentLocation(state, coords) {
            state.latitude = coords.latitude;
            state.longitude = coords.longitude;
        },
        addLocation(state, result) {
            let newLocation = {country: result.sys.country, countryName: result.sys.countryName + result.sys.unicodeFlag, city: result.name}
            state.locations.push(newLocation)
        },
        addWeather(state, result) {
            console.log(result)
            let windDirection = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW", "W"]
            let time = function getDate(date) {
                let newDate = new Date((date + result.timezone) * 1000)
                return newDate.getUTCHours() + ':' + newDate.getUTCMinutes()
            }


            let newWeather = {
                icon: result.weather[0].icon,

                tempCurrent: Math.round(result.main.temp) + '°',
                tempFeels: Math.round(result.main.feels_like) + '°',
                tempMin: Math.round(result.main.temp_min) + '°',
                tempMax: Math.round(result.main.temp_max) + '°',

                weatherMain: result.weather[0].main,
                weatherDsc: result.weather[0].description,

                windDeg: result.wind.deg,
                windDirection: windDirection[Math.ceil(result.wind.deg / 22.5)],
                windSpeed: result.wind.speed + 'km/h',

                sunrise: time(result.sys.sunrise),
                sunset: time(result.sys.sunset),
                currentTime: time(result.dt),
                city: result.name,
                country: result.sys.countryName + ' ' + result.sys.unicodeFlag,

                visibility: (result.visibility / 1000) + 'km',
                humidity: result.main.humidity + '%',
                pressure: Math.round(result.main.pressure * 0.750062)

            }
            state.weather.push(newWeather)
        }

    },

    actions: {
        async getLocalWeather({commit, dispatch, state}) {

            dispatch('getLocalStorageLocation')
            if (state.locations.length === 0) {
                await PositionServices.getPosition().then(
                    (result) => {
                        let coords = {
                            latitude: result.coords.latitude,
                            longitude: result.coords.longitude
                        }
                        commit('updateCurrentLocation', coords)
                        console.log('SUCCESS GET POSITION.', 'LATITUDE =', state.latitude, 'LONGTITUDE =', state.longitude)
                    }
                )
                .catch (
                    (error) => {
                        let coords = {
                            latitude: 44.500000,
                            longitude: -89.500000
                        }
                        commit('updateCurrentLocation', coords)
                        console.log('ERROR GET POSITION. ' + 'CODE: ' + error.code, 'MESSAGE: ' +  error.message + '. ' + 'SET DEFAULT LOCATION (VASHINGTON).')
                    }
                )
    
                await WeatherServices.getCurrentWeather({latitude: state.latitude, longitude: state.longitude}, process.env.VUE_APP_OPEN_WEATHER_API_KEY)
                    .then(
                        async (result) => {
                            let country = await CountiesServices.getNameCountry(result.sys.country)
                            
                            
                            if ('data' in country) {
                                commit("addLocation", result)
                                result.sys.countryName = country.data.name
                                result.sys.unicodeFlag = country.data.unicodeFlag
                                commit("addWeather", result)
                                dispatch('setLocalStorageLocations')
                            }
                        }
                    )
            }
            else {
                for (const item of state.locations) {
                    await WeatherServices.getWeather(item.country, item.city,  process.env.VUE_APP_OPEN_WEATHER_API_KEY).then(
                        async (result) => {
                            let country = await CountiesServices.getNameCountry(result.sys.country)
                            if ('data' in country) {
                                result.sys.countryName = country.data.name
                                result.sys.unicodeFlag = country.data.unicodeFlag
                                commit("addWeather", result)
                            }
                        })
                }
            }
        },
        setLocalStorageLocations({state}) {
            console.log(typeof state.locations, typeof [state.locations])
			localStorage.setItem("locations", JSON.stringify(state.locations));
		},
        getLocalStorageLocation({state}) {
            let locations = localStorage.getItem("locations")
            if (locations != null) {
                state.locations = JSON.parse(locations)
            }
        }
    }
})
