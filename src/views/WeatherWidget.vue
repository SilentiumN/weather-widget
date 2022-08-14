<template>
  <div>
    <div class="widget-box" v-if="!settings">
      <div class="widget-header">
        Weather
        <button class="btn-setting btn-transparent" @click="toggleSettings">
          <Icon :name="'setting'" :color="'#555'" />
        </button>
      </div>
      <div class="weather-box content" v-if="loadingWeatherCard">
        <WeatherCards
          v-for="(weatherItem, index) in weatherCards"
          :key="index"
          :weatherInfo="weatherItem"
        />
      </div>
      <div v-else class="weather-loading content">
        <State :state="'loading'" :sizeStateIcon="50" :color="'#555'" />
      </div>
      <div class="weather-toggle-page-box">
        <button
          class="btn-transparent"
          @click="changePageWeather('reduction')"
          :disabled="reductionButton"
        >
          <Icon :name="'previousPage'" :color="'#555'" />
        </button>
        <button
          class="btn-transparent"
          @click="changePageWeather('increment')"
          :disabled="incrementButton"
        >
          <Icon :name="'nextPage'" :color="'#555'" />
        </button>
      </div>
    </div>
    <Settings
      class="widget-box"
      v-if="settings"
      @closeSettings="toggleSettings"
    />
  </div>
</template>

<script>
import Icon from "../components/General/Icon.vue";
import WeatherCards from "../components/WeatherCard.vue";
import Settings from "@/components/Settings.vue";
import State from "@/components/State.vue";

export default {
  components: {
    Icon,
    WeatherCards,
    Settings,
    State
  },
  data() {
    return {
      settings: false,
    };
  },
  methods: {
    async getLocalStorageData() {
      await this.$store.dispatch("getLocalWeather");
    },
    toggleSettings() {
      this.settings = !this.settings;
    },
    async changePageWeather(operation) {
      await this.$store.dispatch("getNewPageWeather", operation)
    },
  },
  computed: {
    locations() {

      return this.$store.state.locations
    },
    loadingWeatherCard() {
      if (this.weatherCards.length === this.$store.state.locations.slice(
        this.pageWeather * 2,
        (this.pageWeather + 1) * 2).length) {
          return true
        }
        else {
          return false
        }
    },
    weatherCards() {
      return this.$store.state.weather.slice(
        this.pageWeather * 2,
        (this.pageWeather + 1) * 2
      );
    },
    pageWeather() {
      return this.$store.state.pageWeather;
    },
    incrementButton() {
      if (this.locations.length > (this.pageWeather + 1) * 2) {
        return 0
      }
      else return 1
    },
    reductionButton() {
      if(this.pageWeather > 0) {
        return 0
      }
      else return 1
    }
  },
  watch: {},
  mounted() {
    this.getLocalStorageData();
  },
};
</script>
