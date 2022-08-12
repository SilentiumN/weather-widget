<template>
  <div class="location-card">
    <button class="btn-transparent">
      <Icon :name="'burger'" :color="'#555'" />
    </button>
    <span class="text">{{ location.city + ' ' + location.unicodeFlag}}</span>
    <button class="btn-transparent" @click="deleteWeather">
      <Icon :name="'trash'" :color="'#555'" />
    </button>
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
  methods: {
    deleteWeather() {
      this.$store.dispatch("deleteWeather", this.location.id);
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

<style scoped></style>
