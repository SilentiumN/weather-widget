<template>
  <div>
    <div class="widget-header">
      Settings
      <button class="btn-transparent" @click="closeSettings">
        <Icon :name="'close'" :color="'#555'" />
      </button>
    </div>
    <div class="widget-btn-box">
      <button class="btn-transparent" @click="toggleNewLocationBox">
        <Icon :name="'addLocation'" :color="'#555'" />
      </button>
      <div class="toggleCompact">
        Compact
        <div
          :class="compact == false ? 'checkbox' : 'checkbox checkbox-active'"
          @click="toggleCompact"
        >
          <div
            :class="compact == false ? 'circle' : 'circle circle-active'"
          ></div>
        </div>
      </div>
    </div>

    <div class="location-list content" v-if="!addNewLocation" @dragover.prevent>
      <LocationCard
        v-for="location in locations"
        :key="location.id"
        :location="location"
        draggable="true"
        @dragstart="onDragstart($event, location)"
        @drop="onDrop($event, location)"
      />
    </div>
    <SearchCity v-if="addNewLocation" />
  </div>
</template>

<script>
import Icon from "./General/Icon.vue";
import LocationCard from "./LocationCard.vue";
import SearchCity from "./SearchCity.vue";

export default {
  components: {
    Icon,
    LocationCard,
    SearchCity,
  },
  data() {
    return {
      compact: true,
      addNewLocation: false,
    };
  },
  methods: {
    closeSettings() {
      this.$emit("closeSettings");
    },
    toggleCompact() {
      this.compact = !this.compact;
    },
    toggleNewLocationBox() {
      this.addNewLocation = !this.addNewLocation;
    },
    onDragstart(event, item) {
      event.dataTransfer.dropEffect = "move";
      event.dataTransfer.effectAllowed = "move";
      let fromIndex = this.locations.findIndex((e) => e.id == item.id);
      event.dataTransfer.setData("fromIndex", fromIndex);
    },
    onDrop(event, item) {
      let fromIndex = event.dataTransfer.getData("fromIndex");
      let toIndex = this.locations.findIndex((event) => event.id == item.id);
      this.$store.dispatch('swapIndex', {fromIndex: fromIndex, toIndex: toIndex})
    },
  },
  computed: {
    locations() {
      return this.$store.state.locations;
    },
  },
};
</script>

<style scoped></style>
