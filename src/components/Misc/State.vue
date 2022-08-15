<template>
  <div class="state-box">
    <IconForWeatherWidget :name="'spinner'" :iconSize="iconSize" :color="color" v-if="state === 'loading'"/>
    <IconForWeatherWidget :name="'done'" :iconSize="iconSize" v-if="state === 'done'"/>
    <IconForWeatherWidget :name="'error'" :iconSize="iconSize" v-if="state === 'error'"/>
  </div>
</template>

<script>
import IconForWeatherWidget from "@/components/Misc/IconForWeatherWidget.vue";
export default {
  components: {
    IconForWeatherWidget,
  },
  data() {
    return {};
  },
  methods: {},
  props: {
    iconSize: {
      type: Number,
      require: true,
    },
    color: {
      type: String,
      require: true,
    },
    state: {
      type: String,
      require: true,
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/styles/mixins.scss';
@import '@/assets/styles/global.scss';

.state-box {
  margin-top: $defaultWhitespace;
  @include flexible("center");
}
</style>