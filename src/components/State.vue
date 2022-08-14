<template>
  <div class="state-box">
    <Icon :name="'spinner'" :sizeStateIcon="sizeStateIcon" :color="color" v-if="state === 'loading'"/>
    <Icon :name="'done'" :sizeStateIcon="sizeStateIcon" v-if="state === 'done'"/>
    <Icon :name="'error'" :sizeStateIcon="sizeStateIcon" v-if="state === 'error'"/>
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
  methods: {},
  props: {
    sizeStateIcon: {
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

<style scoped></style>
