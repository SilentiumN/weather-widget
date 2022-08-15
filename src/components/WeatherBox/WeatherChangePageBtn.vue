<template>
  <!--Weather change page template-->
  <div class="weather-change-page-box">
    <button
      class="btn btn-transparent"
      @click="changePageWeather('reduction')"
      :disabled="reductionPageWeatherButton"
    >
      <IconForWeatherWidget :name="'previousPage'" :color="'#555'" />
    </button>
    <button
      class="btn btn-transparent"
      @click="changePageWeather('increment')"
      :disabled="incrementPageWeatherButton"
    >
      <IconForWeatherWidget :name="'nextPage'" :color="'#555'" />
    </button>
  </div>
</template>

<script>
import IconForWeatherWidget from '@/components/Misc/IconForWeatherWidget.vue';
export default {
  components: {
    IconForWeatherWidget
  },
  data() {
    return {};
  },
  methods: {
    async changePageWeather(operation) {
      await this.$store.dispatch("weatherModule/updatePageWeather", operation);
    },
  },
  computed: {
    /*-------------Store Variable------------*/
    locationsLength() {
      return this.$store.getters['locationModule/locationLength'];
    },
    pageWeather() {
      return this.$store.state.weatherModule.pageWeather;
    },
    /*---------------------------------------*/

    incrementPageWeatherButton() {
      if (this.locationsLength > (this.pageWeather + 1) * 2) {
        return 0;
      } else return 1;
    },

    reductionPageWeatherButton() {
      if (this.pageWeather > 0) {
        return 0;
      } else return 1;
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/styles/global.scss';
@import '@/assets/styles/mixins.scss';

.weather-change-page-box {
  @include flexible("center");
  margin-top: $defaultWhitespace;
}
</style>
