import axios from "axios";

class LocationService {
    async getNameCountry(isoCode) {
        return axios
            .post(
                "https://countriesnow.space/api/v0.1/countries/flag/unicode", {  
                    "iso2": isoCode
                }
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

    async getCitiesFromCountry(countryName) {
        return axios
            .post(
                "https://countriesnow.space/api/v0.1/countries/cities", {  
                    "country": countryName
                }
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

    async getAllCountry() {
        return axios
            .get(
                "https://countriesnow.space/api/v0.1/countries/flag/unicode"
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

    async getPosition() {
        return new Promise(function (resolve, reject) {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          });
    }
}

export default new LocationService()