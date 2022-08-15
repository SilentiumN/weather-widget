<template>
  <!--Weather card template-->
  <div class="weather-card" :class="weatherInfo.weatherBackground">

    <!--Weather card content-->
    <figure class="weather-card-figure">
      <!--Weather card content compact-->
      <section
        class="weather-card-compact"
        v-show="compact"
      >
        <div class="weather-card-city">
          {{ weatherInfo.city }}
        </div>
        <div>
          <div
            class="weather-card-temp-current weather-card-temp-current-compact"
          >
            {{ weatherInfo.tempCurrent }}
            <img
              :src="`http://openweathermap.org/img/wn/${weatherInfo.icon}@2x.png`"
            />
          </div>
          <div class="weather-card-dsc">
            {{ weatherInfo.weatherDsc }}
          </div>
        </div>
        <div
          class="weather-card-temp-additional weather-card-temp-additional-compact"
        >
          <IconForWeatherWidget
            :name="'tempMax'"
            :color="'#FFFDFA'"
            :iconSize="11"
          />
          <span class="text">{{ weatherInfo.tempMax }}</span>
          <IconForWeatherWidget
            :name="'tempMin'"
            :color="'#FFFDFA'"
            :iconSize="11"
          />
          <span class="text">{{ weatherInfo.tempMin }}</span>
        </div>
      </section>
      <!--Weather card content large-->
      <section
        class="weather-card-normal"
        v-if="!compact"
      >
        <div class="weather-card-city">
          {{ weatherInfo.city }}
        </div>
        <div class="weather-card-time">
          <span class="weather-card-additional-time"
            ><IconForWeatherWidget
              :name="'sunrise'"
              :color="'#FFFDFA'"
              :iconSize="12"
            />{{ weatherInfo.sunrise }}</span
          >
          <span class="weather-card-current-time">
            {{ weatherInfo.currentTime }}
          </span>
          <span class="weather-card-additional-time"
            ><IconForWeatherWidget
              :name="'sunset'"
              :color="'#FFFDFA'"
              :iconSize="12"
            />{{ weatherInfo.sunset }}</span
          >
        </div>

        <div class="weather-card-temp-box">
          <div
            class="weather-card-temp-current weather-card-temp-current-large"
          >
            {{ weatherInfo.tempCurrent }}
            <img
              :src="`http://openweathermap.org/img/wn/${weatherInfo.icon}@2x.png`"
            />
          </div>
          <div
            class="weather-card-temp-additional weather-card-temp-additional-large"
          >
            <div>
              <span class="icon">
                <IconForWeatherWidget
                  :name="'tempMax'"
                  :color="'#FFFDFA'"
                  :iconSize="7"
                />
              </span>
              <span class="text">{{ weatherInfo.tempMax }}</span>
            </div>
            <div>
              <span class="icon">
                <IconForWeatherWidget
                  :name="'tempMin'"
                  :color="'#FFFDFA'"
                  :iconSize="7"
                />
              </span>
              <span class="text">{{ weatherInfo.tempMin }}</span>
            </div>
          </div>
        </div>
        <div class="weather-card-full-info-box">
          <div>
            <div class="weather-card-full-info-item">
              <span class="icon">
                <IconForWeatherWidget
                  :name="'wind'"
                  :color="'#FFFDFA'"
                  :iconSize="14"
                />
              </span>
              <span class="text">{{
                weatherInfo.windSpeed + " " + weatherInfo.windDirection
              }}</span>
            </div>
            <div class="weather-card-full-info-item">
              <span class="icon">
                <IconForWeatherWidget
                  :name="'pressure'"
                  :color="'#FFFDFA'"
                  :iconSize="14"
                />
              </span>
              <span class="text">{{ weatherInfo.pressure + "mm Hg" }}</span>
            </div>
          </div>
          <div>
            <div class="weather-card-full-info-item">
              <span class="icon">
                <IconForWeatherWidget
                  :name="'visibility'"
                  :color="'#FFFDFA'"
                  :iconSize="14"
                />
              </span>
              <span class="text">{{ weatherInfo.visibility }}</span>
            </div>
            <div class="weather-card-full-info-item">
              <span class="icon">
                <IconForWeatherWidget
                  :name="'humidity'"
                  :color="'#FFFDFA'"
                  :iconSize="14"
                />
              </span>
              <span class="text">{{ weatherInfo.humidity }}</span>
            </div>
          </div>
        </div>
      </section>
    </figure>
  </div>
</template>

<script>
import IconForWeatherWidget from "@/components/Misc/IconForWeatherWidget.vue";
export default {
  components: {
    IconForWeatherWidget,
  },
  props: {
    weatherInfo: {
      type: Object,
      require: true,
    },
  },
  computed: {
    compact() {
        return this.$store.state.weatherModule.compactSizeCard;
      },
  },
};
</script>

<style lang="scss">
@import "@/assets/styles/global.scss";
@import "@/assets/styles/mixins.scss";
@import "@/assets/styles/function.scss";

.weather-card {
  width: 100%;
  margin-top: $defaultWhitespace;
  border-radius: 20px;
  padding: 10px;
  position: relative;
  color: #fffdfa;
}

.day {
  background: linear-gradient(#728FC9, #C1D1EE);
}

.night {
  background: linear-gradient(#2A459C, #728FC9);
}

.weather-card-figure {
  padding-top: 100%;
  margin: 0;
  position: relative;
  & section {
    @include flexDirection(column, nowrap);
    justify-content: space-between;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 2;
  }
}

.weather-card-background {
  width: 100%;
  z-index: 1;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  border-radius: 10px;
}

.weather-card-city {
  font-size: $normal;
  font-weight: 700;
  text-align: center;
}

.weather-card-temp-current {
  font-weight: 500;
}

.weather-card-temp-current-compact {
  font-size: 3rem;
  img {
    height: calc(3rem * 1.6);
  }
}

.weather-card-temp-current-large {
  font-size: 2.5rem;
  img {
    height: calc(2rem * 1.6);
  }
}

.weather-card-temp-current-compact,
.weather-card-temp-additional-compact {
  @include flexible("center");
}

.weather-card-temp-additional {
  font-weight: 600;
  .text {
    margin: 0 5px;
  }
}

.weather-card-temp-additional-compact {
  font-size: $sm-plus;
}

.weather-card-dsc {
  font-size: $normal;
  text-align: center;
  font-weight: 500;
}

.weather-card-time {
  font-size: $small;
  @include flexible("center");
}

.weather-card-current-time {
  font-weight: 700;
}

.weather-card-additional-time {
  @include flexDirection(row, nowrap);
  padding: 0 5px;
  font-weight: 500;
}

.weather-card-temp-box {
  @include flexible("center");
}

.weather-card-temp-current-large {
  display: flex;
  align-items: center;
}

.weather-card-temp-additional-large {
  @include flexDirection(column, nowrap);
  div {
    @include flexDirection(row, nowrap);
  }
  font-size: $small;
}

.weather-card-full-info-box {
  @include flexDirection(row, nowrap);
  justify-content: center;
}

.weather-card-full-info-item {
  font-size: $small;
  font-weight: 700;
  @include flexDirection(row, nowrap);
  .icon {
    margin-right: 5px;
  }
  margin-right: 5px;
}
</style>
