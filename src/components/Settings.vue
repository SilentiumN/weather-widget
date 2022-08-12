<template>
  <div>
    <div class="widget-header">
      Hello, my dear friend!
      <button class="btn-white" @click="closeSettings">
        <Icon :name="'close'" :color="'#555'" />
      </button>
    </div>
    <div class="toggleCompact">
      Compact
      <div
        :class="
          compact == false ? 'checkbox' : 'checkbox checkbox-active'
        "
         @click="toggleCompact"
      >
        <div
          :class="compact == false ? 'circle' : 'circle circle-active'"
        ></div>
      </div>
    </div>
    <div class="location-list">
        <LocationCard v-for="location in locations" :key="location.id" :location="location"/>
    </div>
  </div>
</template>

<script>
import Icon from "./General/Icon.vue";
import LocationCard from "./LocationCard.vue";
export default {
  components: {
    Icon,
    LocationCard
  },
  data() {
    return {
      compact: true,
    };
  },
  methods: {
    closeSettings() {
      this.$emit("closeSettings");
    },
    toggleCompact() {
        this.compact = !this.compact
    }
  },
  computed: {
        locations() {
            return this.$store.state.locations
        }
    }
};
</script>

<style scoped></style>
