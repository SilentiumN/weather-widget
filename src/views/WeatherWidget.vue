<template>
<div class="widget-box">
    <div class="widget-header">
        Hello, my dear friend! 
        <button class="btn-setting">
            <Icon :name="'setting'" :color="'#555'"/>
        </button>
    </div>
    <Icon :name="'sunrise'" :color="'#555'"/>
    <Icon :name="'sunset'" :color="'#555'"/>
    <Icon :name="'wind'" :color="'#555'"/>
    <Icon :name="'humidity'" :color="'#555'"/>
    <Icon :name="'visibility'" :color="'#555'"/>
    <Icon :name="'pressure'" :color="'#555'"/>
    <Icon :name="'tempMin'" :color="'#555'"/>
    <Icon :name="'tempMax'" :color="'#555'"/>
    <div class="weather-box" v-if="loadedLocalData">
        <WeatherCards v-for="(weatherItem, index) in weatherCards" :key="index" :weatherInfo="weatherItem"/>
        <WeatherCards v-for="(weatherItem, index) in weatherCards" :key="index" :weatherInfo="weatherItem"/>
        <WeatherCards v-for="(weatherItem, index) in weatherCards" :key="index" :weatherInfo="weatherItem"/>
        <WeatherCards v-for="(weatherItem, index) in weatherCards" :key="index" :weatherInfo="weatherItem"/>
    </div>
    <!--<img :src="`https://openweathermap.org/img/wn/${weatherCards[0].weather[0].icon}.png`"/>-->
</div>
</template>

<script>
import Icon from '../components/General/Icon.vue'
import WeatherCards from '../components/WeatherCard.vue'

export default {
    components: {
        Icon,
        WeatherCards
    },
    data() {
        return {
            loadedLocalData: false
        }
    },
    methods: {
        async getLocalStorageData() {
            await this.$store.dispatch('getLocalWeather')
            this.loadedLocalData = true
        }
    },
     computed: {
        weatherCards() {
            return this.$store.state.weather
        }
    },
    watch: {

    },
    mounted() {
        this.getLocalStorageData()
    }
}
</script>