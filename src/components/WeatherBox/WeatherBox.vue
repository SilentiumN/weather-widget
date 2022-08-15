<template>
  <div>
    <!--Weather card list-->
    <WeatherCardList />
    <!--Weather change page button box-->
    <WeatherChangePageBtn/>
  </div>
</template>

<script>
import WeatherCardList from "@/components/WeatherBox/WeatherCardList.vue";
import WeatherChangePageBtn from "@/components/WeatherBox/WeatherChangePageBtn.vue";
export default {
  components: {
    WeatherCardList,
    WeatherChangePageBtn,
  }
};
</script>
