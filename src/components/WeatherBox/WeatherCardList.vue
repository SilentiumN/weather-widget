<template>
  <!--Weather card list template-->
  <div class="content">
    <div class="weather-box" v-if="loadingWeatherCard">
      <WeatherCard
        v-for="(weatherItem, index) in weatherCards"
        :key="index"
        :weatherInfo="weatherItem"
      />
    </div>
    <div v-else class="weather-card-list-loading">
      <State :state="'loading'" :iconSize="50" :color="'#555'" />
    </div>
  </div>
</template>

<script>
import State from "@/components/Misc/State.vue";
import WeatherCard from "@/components/WeatherBox/WeatherCard.vue";

export default {
  components: {
    State,
    WeatherCard,
  },
  data() {
    return {};
  },
  computed: {
    loadingWeatherCard() {
      if (
        this.weatherCards.length === this.locationPage.length &&
        this.locationPage.length != 0
      ) {
        return true;
      } else {
        return false;
      }
    },
    /*-------------Store Variable------------*/
    weatherCards() {
      return this.$store.getters["weatherModule/weatherPage"];
    },
    locationPage() {
      return this.$store.getters["locationModule/locationPage"];
    },
    /*---------------------------------------*/
  },
};
</script>

<style lang="scss">
.weather-card-list-loading {
  display: flex;
}
</style>
