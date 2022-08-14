<template>
  <div class="weather-item">
    <img
      class="weather-background"
      :src="require(`../assets/images/${weatherInfo.weatherBackground}.jpg`)"
      @load="backgroundLoading()"
      v-show="backgroundLoadingValue"
    />
    <figure class="weather-item-figure">
      <section  v-show="backgroundLoadingValue">
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
    return {
      backgroundLoadingValue: false,
    };
  },
  methods: {
    backgroundLoading() {
      this.backgroundLoadingValue = true;
    },
  },
  props: {
    weatherInfo: {
      type: Object,
      require: true,
    },
  },
};
</script>

<style scoped></style>
