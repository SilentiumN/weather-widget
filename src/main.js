import { createApp } from 'vue'
import WeatherWidget from './views/WeatherWidget.vue'
import router from "./router";
import store from "./store";
import style from "./assets/styles/main.scss"

createApp(WeatherWidget).use(store).use(router).mount('weather-widget')
