import axios from "axios";

class WeatherService {
    async getCurrentWeather(coord, apikey) {
        return axios
            .get(
                `https://api.openweathermap.org/data/2.5/weather?lat=${coord.latitude}&lon=${coord.longitude}&appid=${apikey}&units=metric`
            )
            .then(response => {
                return response.data
            })
    }
    async getWeather(country, city, apikey) {
        return axios
            .get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&appid=${apikey}&units=metric`
            )
            .then(response => {
                return response.data
            })
            .catch(
                error => {
                    return error.response.data
                }
            )
    }
}

export default new WeatherService()