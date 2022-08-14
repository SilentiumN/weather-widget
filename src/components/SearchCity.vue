<template>
  <div>
    <div v-if="tryAddedCity === false">
      <div v-if="addedCitySuccess == null">
        <!--Countries list-->
        <div v-if="loadedCountries">
          <!--Countries list get success-->
          <div class="select-input" v-if="countries.length != 0">
            {{ countryValue }}
            <select v-model="country">
              <option
                v-for="(country, index) in countries"
                :key="index"
                :value="country"
              >
                {{ country.name + " " + country.unicodeFlag }}
              </option>
            </select>
          </div>
          <!--Countries list get error-->
          <div v-else class="add-city-success">Error getting countries</div>
        </div>

        <!--Cities list-->
        <div v-if="country != null">
          <!--Cities list get success-->
          <div class="select-input" v-if="loadedCities && cities.length != 0">
            {{ cityValue }}
            <select v-model="city">
              <option
                v-for="(city, index) in cities"
                :key="index"
                :value="city"
              >
                {{ city }}
              </option>
            </select>
          </div>
          <!--Cities list get error-->
          <div
            v-else-if="loadedCities && cities.length === 0"
            class="add-city-success"
          >
            Cities in {{ country.name }} not found
          </div>
          <!--Cities list loading-->
          <div v-else class="state-loading">
            <State :sizeStateIcon="24" :color="'#555'" :state="'loading'" />
          </div>
        </div>

        <!--Add button-->
        <button
          v-if="country != null && city != null"
          class="add-new-city-btn"
          @click="addNewCity"
        >
          Add
        </button>
      </div>
    </div>
    <!-- State Icon Box -->
    <div>
      <State
        :sizeStateIcon="50"
        :state="addedCitySuccess"
        v-if="addedCitySuccess != null"
      />
      <State
        :sizeStateIcon="50"
        :color="'#555'"
        :state="'loading'"
        v-if="tryAddedCity === true || loadedCountries === false"
      />
    </div>
    <div
      class="add-city-success"
      v-if="addedCitySuccess != null"
    >
      {{ successInfo }}
    </div>
    <button class="add-new-city-btn" v-if="addedCitySuccess != null" @click="clearAddedCitySuccess">
      {{ successInfoBtn }}
    </button>
  </div>
</template>

<script>
import Icon from "./General/Icon.vue";
import State from "./State.vue";
export default {
  components: { Icon, State },
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
    clearAddedCitySuccess() {
      this.country = null
      this.city = null
      this.addedCitySuccess = null
    }
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
  computed: {
    cityValue() {
      if (this.city != null) {
        return this.city;
      } else {
        return "Chose city";
      }
    },
    countryValue() {
      if (this.country != null) {
        return this.country.name + " " + this.country.unicodeFlag;
      } else {
        return "Chose country";
      }
    },
    successInfo() {
      if (this.addedCitySuccess === "done") {
        return "City added";
      } else {
        return "City not found in Weather API";
      }
    },
    successInfoBtn() {
      if (this.addedCitySuccess === "done") {
        return "Nice!";
      } else {
        return "Try add new city";
      }
    },
  },
};
</script>

<style scoped></style>
