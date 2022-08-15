<template>
  <!--Weather widget template-->
  <div class="weather-widget-box slow-show">
    <!--Weather widget header-->
    <div class="weather-widget-header">
      {{ header.text }}
      <button
        class="btn btn-transparent"
        :class="settings ? '' : 'weather-widget-btn-setting'"
        @click="toggleSettings"
      >
        <IconForWeatherWidget :name="header.icon" :color="'#555'" />
      </button>
    </div>

    <!--Weather widget content list-->
    <WeatherBox class="content" v-if="!settings" />

    <!--Weather widget settings-->
    <Settings class="content" v-if="settings" @closeSettings="toggleSettings" />
  </div>
</template>

<script>
import IconForWeatherWidget from "@/components/Misc/IconForWeatherWidget.vue";
import Settings from "@/components/Settings/Settings.vue";
import WeatherBox from "@/components/WeatherBox/WeatherBox.vue";

export default {
  components: {
    IconForWeatherWidget,
    Settings,
    WeatherBox,
  },
  data() {
    return {
      settings: false,
    };
  },
  mounted() {
    this.getLocalStorageData();
  },
  methods: {
    toggleSettings() {
      this.settings = !this.settings;
    },
    async getLocalStorageData() {
      console.log(this.$store.state);
      this.$store.dispatch("weatherModule/getLocalStorageSize");
      await this.$store.dispatch("locationModule/checkLocalStorageLocation");
      await this.$store
        .dispatch("weatherModule/getWeather")
        .then(async (result) => {
          if (this.locations.length === 0) {
            await this.$store.dispatch("locationModule/addNewLocation", result);
          }
        });
    },
  },
  computed: {
    /*-------------Store Variable------------*/
    locations() {
      return this.$store.state.locationModule.locations;
    },
    /*---------------------------------------*/
    header() {
      let header = {
        text: "",
        icon: "",
      };
      if (this.settings === true) {
        header.text = "Setting";
        header.icon = "close";
      } else {
        header.text = "Weather";
        header.icon = "setting";
      }

      return header;
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/styles/global.scss";
@import "@/assets/styles/mixins.scss";
@import "@/assets/styles/function.scss";

.weather-widget-header {
  font-size: $large;
  @include flexible("between");
  color: $grey;
  font-weight: 600;
}

.weather-widget-box {
  width: 200px;
  height: 483px;
  border-radius: 20px;
  box-shadow: 0px 0px 15px darkColor(0.08);
  padding: $defaultWhitespace;
}

.weather-widget-btn-setting:hover {
  @include rotateAnimation();
}
</style>
