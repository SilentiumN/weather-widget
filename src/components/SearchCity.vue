<template>
  <div>
    <div v-if="addedCitySuccess == null && !tryAddedCity">
      <select
        v-model="country"
        v-if="loadedCountries"
        :style="{ color: '#555' }"
      >
        <option
          v-for="(country, index) in countries"
          :key="index"
          :value="country"
        >
          {{ country.name + " " + country.unicodeFlag }}
        </option>
      </select>
      <select
        v-model="city"
        :style="{ color: '#555' }"
        v-if="country != null && loadedCities && cities.length != 0"
      >
        <option v-for="(city, index) in cities" :key="index" :value="city">
          {{ city }}
        </option>
      </select>
      <div
        v-else-if="country != null && loadedCities && cities.length === 0"
        :style="{ color: '#555' }"
      >
        Cities in {{ country.name }} not found
      </div>
      <button
        v-if="country != null && city != null"
        :style="{ color: '#555' }"
        @click="addNewCity"
      >
        Add
      </button>
    </div>
    <div v-if="!addedCitySuccess && !tryAddedCity">false</div>
    <div v-if="addedCitySuccess && !tryAddedCity">true</div>
    <div v-else>
      <span><Icon :name="'spinner'" :color="'#555'"/></span>
    </div>
  </div>
</template>

<script>
import Icon from "./General/Icon.vue";
export default {
  components: { Icon },
  data() {
    return {
      countries: [],
      cities: [],
      country: null,
      city: null,
      loadedCountries: false,
      loadedCities: false,
      addedCitySuccess: null,
      tryAddedCity: false,
    };
  },
  methods: {
    async getAllCountries() {
      await this.$store.dispatch("getAllCountries").then((result) => {
        this.loadedCountries = true;
        this.countries = result;
      });
    },
    async getCities(country) {
      this.loadedCities = false;
      this.city = null;
      this.cities = [];
      await this.$store
        .dispatch("getCitiesFromCountry", country)
        .then((result) => {
          this.loadedCities = true;
          this.cities = result;
        });
    },
    async addNewCity() {
      this.tryAddedCity = true;
      console.log("data", { country: this.country.iso2, city: this.city });
      await this.$store
        .dispatch("addNewLocation", {
          country: this.country.iso2,
          city: this.city,
        })
        .then((res) => {
          this.addedCitySuccess = res;
          this.tryAddedCity = false;
        });
    },
  },
  mounted() {
    this.getAllCountries();
  },
  watch: {
    country: async function () {
      console.log(this.country);
      if (this.country != null) {
        console.log(this.country.name);
        await this.getCities(this.country.name);
      }
    },
  },
};
</script>

<style scoped></style>
