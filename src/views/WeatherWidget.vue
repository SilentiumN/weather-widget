<template>
  <div>
    <div class="widget-box" v-if="!settings">
      <div class="widget-header">
        Hello, my dear friend!
        <button class="btn-setting btn-white" @click="toggleSettings">
          <Icon :name="'setting'" :color="'#555'" />
        </button>
      </div>
      <div class="weather-box" v-if="loadedLocalData">
        <WeatherCards
          v-for="(weatherItem, index) in weatherCards"
          :key="index"
          :weatherInfo="weatherItem"
        />
        <WeatherCards
          v-for="(weatherItem, index) in weatherCards"
          :key="index"
          :weatherInfo="weatherItem"
        />
        <WeatherCards
          v-for="(weatherItem, index) in weatherCards"
          :key="index"
          :weatherInfo="weatherItem"
        />
        <WeatherCards
          v-for="(weatherItem, index) in weatherCards"
          :key="index"
          :weatherInfo="weatherItem"
        />
      </div>
    </div>
    <Settings class="widget-box" v-if="settings" @closeSettings="toggleSettings"/>
  </div>
</template>

<script>
import Icon from "../components/General/Icon.vue";
import WeatherCards from "../components/WeatherCard.vue";
import Settings from "@/components/Settings.vue";

export default {
  components: {
    Icon,
    WeatherCards,
    Settings
  },
  data() {
    return {
      loadedLocalData: false,
      settings: false
    };
  },
  methods: {
    async getLocalStorageData() {
      await this.$store.dispatch("getLocalWeather");
      this.loadedLocalData = true;
    },
    toggleSettings() {
        this.settings = !this.settings 
    }
  },
  computed: {
    weatherCards() {
      return this.$store.state.weather;
    },
  },
  watch: {},
  mounted() {
    this.getLocalStorageData();
  },
};
</script>
