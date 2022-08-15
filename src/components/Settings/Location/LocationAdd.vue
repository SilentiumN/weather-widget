<template>
  <div class="slow-show">
    <div v-if="tryAddedCity === false">
      <div v-if="addedCitySuccess == null">
        <!--Countries list-->
        <div v-if="loadedCountries">
          <!--Countries list get success-->
          <div class="location-add-select-iput slow-show" :class="disabledCountrySelect === 1 ? 'disabled-country-select' : ''" v-if="countries.length != 0">
            {{ countryValue }}
            <select v-model="country" :disabled="disabledCountrySelect">
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
          <div v-else class="location-add-success slow-show">Error getting countries</div>
        </div>

        <!--Cities list-->
        <div v-if="country != null">
          <!--Cities list get success-->
          <div class="location-add-select-iput slow-show" v-if="loadedCities && cities.length != 0">
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
            class="location-add-success slow-show"
          >
            Cities in {{ country.name }} not found
          </div>
          <!--Cities list loading-->
          <div v-else class="state-loading slow-show">
            <State :iconSize="24" :color="'#555'" :state="'loading'" />
          </div>
        </div>

        <!--Add button-->
        <button
          v-if="country != null && city != null"
          class="btn location-add-btn slow-show"
          @click="addNewCity"
        >
          Add
        </button>
      </div>
    </div>
    <!-- State added location box -->
    <div class="slow-show">
      <State
        :iconSize="50"
        :state="addedCitySuccess.success"
        v-if="addedCitySuccess != null"
      />
      <State
        :iconSize="50"
        :color="'#555'"
        :state="'loading'"
        v-if="tryAddedCity === true || loadedCountries === false"
      />
    </div>
    <div
      class="location-add-success"
      v-if="addedCitySuccess != null"
    >
      {{ addedCitySuccess.msg }}
    </div>
    <button class="btn location-add-btn" v-if="addedCitySuccess != null" @click="clearAddedCitySuccess">
      {{ successInfoBtn }}
    </button>
  </div>
</template>

<script>
import IconForWeatherWidget from "@/components/Misc/IconForWeatherWidget.vue";
import State from "@/components/Misc/State.vue";
export default {
  components: { IconForWeatherWidget, State },
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
      await this.$store.dispatch("locationModule/getAllCountries").then((result) => {
        this.loadedCountries = true;
        this.countries = result;
      });
    },
    async getCities(country) {
      this.loadedCities = false;
      this.city = null;
      this.cities = [];
      await this.$store
        .dispatch("locationModule/getCitiesFromCountry", country)
        .then((result) => {
          this.loadedCities = true;
          this.cities = result;
        });
    },
    async addNewCity() {
      this.tryAddedCity = true;
      await this.$store
        .dispatch("weatherModule/addNewWeather", {
          country: this.country.iso2,
          city: this.city,
        })
        .then((res) => {
          this.addedCitySuccess = res.res_data;
          if (res.location != null) {
            this.$store.dispatch('locationModule/addNewLocation', res.location)
          }
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
      if (this.country != null) {
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
    successInfoBtn() {
      if (this.addedCitySuccess.success === "done") {
        return "Nice!";
      } else {
        return "Try add new city";
      }
    },
    disabledCountrySelect() {
      if (!this.loadedCities && this.country != null) {
        return 1
      }
      else {
        return 0
      }
    }
  },
};
</script>

<style lang="scss">
@import '@/assets/styles/global.scss';
@import '@/assets/styles/mixins.scss';
@import '@/assets/styles/function.scss';

.location-add-select-iput {
  @include locationCard("ligth");
  position: relative;
  font-size: $sm-plus;
  select {
    opacity: 0;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
  }
}

.location-add-btn {
  @include locationCard("dark");
  font-size: $sm-plus;
  font-weight: 600;
}

.location-add-success {
  margin-top: $defaultWhitespace;
  color: $grey;
  text-align: center;
  font-size: $sm-plus;
}

.disabled-country-select {
  background: darkColor(0.1);
}
</style>
