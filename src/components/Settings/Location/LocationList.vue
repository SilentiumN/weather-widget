<template>

  <!--Location list template-->
  <div class="location-list content slow-show" ref="locationList">
    <LocationCard
      v-for="location in locations"
      ref="locationCards"
      :key="location.id"
      :location="location"
      
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
    onDragover(event) {
      event.preventDefault()
    },
    addLocationListEvent() {
      this.$refs.locationList.addEventListener('dragover', this.onDragover)
    },
    removeLocationListEvent() {
      this.$refs.locationList.removeEventListener('dragover', this.onDragover)
    }
  },
  computed: {
    /*-------------Store Variable------------*/
    locations() {
      return this.$store.state.locationModule.locations;
    },
    /*---------------------------------------*/
  },
  mounted() {
    this.addLocationListEvent()
  },
  beforeUnmount() {
    this.removeLocationListEvent()
  }
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
