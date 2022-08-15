<template>

  <!--Location list template-->
  <div class="location-list content slow-show" @dragover.prevent>
    <LocationCard
      v-for="location in locations"
      :key="location.id"
      :location="location"
      draggable="true"
      @dragstart="onDragstart($event, location)"
      @drop="onDrop($event, location)"
    />
  </div>
  
</template>

<script>
import LocationCard from "@/components/Settings/Location/LocationCard.vue";
export default {
  components: {
    LocationCard,
  },
  data() {
    return {};
  },
  methods: {
    onDragstart(event, item) {
      event.dataTransfer.dropEffect = "move";
      event.dataTransfer.effectAllowed = "move";
      let fromIndex = this.locations.findIndex((e) => e.id == item.id);
      event.dataTransfer.setData("fromIndex", fromIndex);
    },
    onDrop(event, item) {
      let fromIndex = event.dataTransfer.getData("fromIndex");
      let toIndex = this.locations.findIndex((event) => event.id == item.id);
      let position = {
        fromIndex: fromIndex,
        toIndex: toIndex,
      }

      this.updateIndex(position)

    },
    updateIndex(position) {
      this.$store.dispatch("locationModule/updateLocationIndex", position);
      this.$store.dispatch("weatherModule/updateWeatherIndex", position);
    }
  },
  computed: {
    /*-------------Store Variable------------*/
    locations() {
      return this.$store.state.locationModule.locations;
    },
    /*---------------------------------------*/
  },
};
</script>

<style lang="scss">
.location-list {
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and EDGE */
  scrollbar-width: none; /* Firefox */
}

.location-list::-webkit-scrollbar {
  display: none;
}
</style>
