import axios from "axios";

class CountriesService {
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
    }

    async getCitiesFromCountry(countryName) {
        console.log('countryName', countryName)
        return axios
            .post(
                "https://countriesnow.space/api/v0.1/countries/cities", {  
                    "country": countryName
                }
            )
            .then(response => {
                console.log('response', response)
                return response.data
            })
            .catch(
                error => {
                    console.log('error', error.response.data)
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
                console.log(response)
                return response.data
            })
    }
}

export default new CountriesService()