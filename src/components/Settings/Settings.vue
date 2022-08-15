<template>
  <div>
    <!--Settings button box-->
    <div class="setting-btn-box">
      <button class="btn btn-transparent" @click="toggleNewLocationBox">
        <IconForWeatherWidget :name="'addLocation'" :color="'#555'" />
      </button>
      <div class="setting-toggle-compact-box">
        Compact
        <div class="setting-checkbox" :class="active.checkbox" @click="toggleCompact">
          <div class="setting-checkbox-circle" :class="active.circle"></div>
        </div>
      </div>
    </div>

    <LocationList v-if="!addNewLocation" />
    <LocationAdd v-if="addNewLocation" />
  </div>
</template>

<script>
import IconForWeatherWidget from "@/components/Misc/IconForWeatherWidget.vue";
import LocationAdd from "@/components/Settings/Location/LocationAdd.vue";
import LocationList from "@/components/Settings/Location/LocationList.vue";

export default {
  components: {
    IconForWeatherWidget,
    LocationAdd,
    LocationList
  },
  data() {
    return {
      addNewLocation: false,
    };
  },
  methods: {
    closeSettings() {
      this.$emit("closeSettings");
    },
    toggleCompact() {
      this.$store.dispatch('weatherModule/changeSizeCard')
    },
    toggleNewLocationBox() {
      this.addNewLocation = !this.addNewLocation;
    },
  },
  computed: {
    active() {
      let className = {
        checkbox: "",
        circle: "",
      };
      if (this.compact === true) {
        className.checkbox = "setting-checkbox-active";
        className.circle = "setting-checkbox-circle-active";
      }
      return className;
    },
    compact() {
        return this.$store.state.weatherModule.compactSizeCard;
      },
  },
};
</script>

<style lang="scss">
@import '@/assets/styles/global.scss';
@import '@/assets/styles/mixins.scss';
@import '@/assets/styles/function.scss';

.setting-btn-box {
  @include flexDirection(row, wrap);
  justify-content: space-between;
  margin-top: $defaultWhitespace;
}

.setting-checkbox {
  background: darkColor(0.15);
  border-radius: 12px;
  width: 29px;
  padding: 3px;
  margin-left: $defaultWhitespace;
}

.setting-checkbox-circle {
  box-shadow: 0px 2px 8px darkColor(0.35);
  background: $white;
  width: 11px;
  height: 11px;
  border-radius: 50%;
}

.setting-checkbox,
.setting-checkbox-circle {
  transition: all 0.7s ease;
  -moz-transition: all 0.7s ease;
  -webkit-transition: all 0.7s ease;
}

.setting-checkbox-active {
  background: #555 !important;
}

.setting-checkbox-circle-active {
  margin-left: 12px;
}

.setting-toggle-compact-box {
  display: flex;
  align-items: center;
  color: $grey;
  font-size: $sm-plus;
}
</style>
