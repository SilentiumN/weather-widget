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
        return axios
            .post(
                "https://countriesnow.space/api/v0.1/countries/cities", {  
                    "country": countryName
                }
            )
            .then(response => {
                return response.data
            })
    }

    async getAllCountry(countryName) {
        return axios
            .post(
                "https://countriesnow.space/api/v0.1/countries/cities", {  
                    "country": countryName
                }
            )
            .then(response => {
                return response.data
            })
    }
}

export default new CountriesService()