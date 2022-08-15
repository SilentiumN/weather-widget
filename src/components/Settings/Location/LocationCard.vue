<template>

  <!--Location card template-->
  <div class="location-card">
    <button class="btn btn-transparent">
      <IconForWeatherWidget :name="'burger'" :color="'#555'" />
    </button>
    <span class="text">{{ location.city + " " + location.unicodeFlag }}</span>
    <button class="btn btn-transparent" @click="deleteWeather">
      <IconForWeatherWidget :name="'trash'" :color="'#555'" />
    </button>
  </div>
  
</template>

<script>
import IconForWeatherWidget from "@/components/Misc/IconForWeatherWidget.vue";
export default {
  components: {
    IconForWeatherWidget,
  },
  methods: {
    deleteWeather() {
      this.$store.dispatch("weatherModule/deleteWeather", this.location.id);
      this.$store.dispatch("locationModule/deleteLocation", this.location.id);
    },
  },
  props: {
    location: {
      type: Object,
      require: true,
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/styles/global.scss';
@import '@/assets/styles/mixins.scss';

.location-card {
  @include locationCard("ligth");
  @include flexible("between");
  .text {
    width: calc(100% - 64px);
    color: $grey;
    font-size: $sm-plus;
    font-weight: 400;
  }
}
</style>
