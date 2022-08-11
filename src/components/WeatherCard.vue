<template>
<div class="weather-item">
    {{weatherInfo}}
</div>
</template>

<script>
export default {
    components: {

    },
    data() {
        return {

        }
    },
    methods: {
        
    },
    props: {
        weatherInfo: {
            type: Object,
            require: true
        }
    }
}
</script>

<style scoped>
</style>