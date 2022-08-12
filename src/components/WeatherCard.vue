<template>
  <div
    class="weather-item"
    :style="{
      backgroundImage:
        'url(' +
        require('../assets/images/' + weatherInfo.weatherBackground + '.jpg') +
        ')',
    }"
  >
    <figure class="weather-item-figure">
      <section>
        <div class="weather-city">
          {{ weatherInfo.city }}
        </div>
        <div>
          <div class="weather-temp-current">
            {{ weatherInfo.tempCurrent }}
            <img
              :src="`http://openweathermap.org/img/wn/${weatherInfo.icon}@2x.png`"
            />
          </div>
          <div class="weather-dsc">
            {{ weatherInfo.weatherDsc }}
          </div>
        </div>

        <div class="weather-temp-additional">
          <Icon :name="'tempMax'" :color="'#FFFDFA'" />
          <span class="text">{{ weatherInfo.tempMax }}</span>
          <Icon :name="'tempMin'" :color="'#FFFDFA'" />
          <span class="text">{{ weatherInfo.tempMin }}</span>
        </div>
      </section>
    </figure>
  </div>
</template>

<script>
import Icon from "./General/Icon.vue";
export default {
  components: {
    Icon,
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
