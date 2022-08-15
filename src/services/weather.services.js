import axios from "axios";

class WeatherService {
    constructor() {
        this.apikey = '673a5559a0536e9636be1ed282d0a897';
    }

    async getCurrentWeather(coord) {
        return axios
            .get(
                `https://api.openweathermap.org/data/2.5/weather?lat=${coord.latitude}&lon=${coord.longitude}&appid=${this.apikey}&units=metric`
            )
            .then(response => {
                return response.data
            })
    }
    async getWeather(country, city) {
        return axios
            .get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&appid=${this.apikey}&units=metric`
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