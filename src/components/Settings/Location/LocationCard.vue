<template>

  <!--Location card template-->
  <div class="location-card" ref="locationCard">
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
    onDragstart(event) {
      event.dataTransfer.dropEffect = "move";
      event.dataTransfer.effectAllowed = "move";
      console.log(this.locations)
      let fromIndex = this.locations.findIndex((e) => e.id == this.location.id);
      console.log(fromIndex)
      event.dataTransfer.setData("fromIndex", fromIndex);
    },
    onDrop(event) {
      let fromIndex = event.dataTransfer.getData("fromIndex");
      let toIndex = this.locations.findIndex((event) => event.id == this.location.id);
      let position = {
        fromIndex: fromIndex,
        toIndex: toIndex,
      }

      this.updateIndex(position)

    },
    updateIndex(position) {
      this.$store.dispatch("locationModule/updateLocationIndex", position);
      this.$store.dispatch("weatherModule/updateWeatherIndex", position);
    },
    initLocationCardEvent() {
      this.$refs.locationCard.setAttribute('draggable', true);
      this.$refs.locationCard.addEventListener('dragstart', this.onDragstart)
      this.$refs.locationCard.addEventListener('drop', this.onDrop)
    },
    removeLocationCardEvent() {
      this.$refs.locationCard.setAttribute('draggable', false);
      this.$refs.locationCard.removeEventListener('dragstart', this.onDragstart)
      this.$refs.locationCard.removeEventListener('drop', this.onDrop)
    }

  },
  props: {
    location: {
      type: Object,
      require: true,
    },
  },
  computed: {
    locations() {
      return this.$store.state.locationModule.locations;
    },
  },
  mounted() {
    this.initLocationCardEvent()
  },
  beforeUnmount() {
    this.removeLocationCardEvent()
  }
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
