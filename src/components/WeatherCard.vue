<template>
  <div class="weather-item">
    <div class="compact-weather-main-info">
      <div class="weather-geoposition-info">
        <span class="weather-city">
          {{ weatherInfo.city + ", " + weatherInfo.country }}
        </span>
        <span class="weather-time">
          {{ weatherInfo.currentTime }}
        </span>
      </div>
      <div class="weather-temp-current">
        {{ weatherInfo.tempCurrent }}
      </div>
    </div>
    <div class="compact-weather-dsc">
        <span class="weather-type">{{weatherInfo.weatherMain}} <img :src="`http://openweathermap.org/img/wn/${weatherInfo.icon}@2x.png`"/></span>
        <span class="weather-temp-additional"><Icon :name="'tempMax'" :color="'#555'"/>{{weatherInfo.tempMax}} <Icon :name="'tempMin'" :color="'#555'"/>{{weatherInfo.tempMin}}</span>
    </div>
  </div>
</template>

<script>
import Icon from './General/Icon.vue';
export default {
  components: {
    Icon
  },
  data() {
    return {};
  },
  methods: {},
  props: {
    weatherInfo: {
      type: Object,
      require: true,
    },
  },
};
</script>

<style scoped></style>
