<template>
<div class="location-card">
    <Icon :name="'burger'" :color="'#FFFDFA'"/>
    {{location.city + ', ' + location.countryName}}
    <Icon :name="'trash'" :color="'#FFFDFA'"/>
</div>
</template>

<script>
import Icon from './General/Icon.vue';
export default {
    components: {
        Icon
    },
    data() {
        return {

        }
    },
    methods: {
        
    },
    props: {
        location: {
            type: Object,
            require: true
        }
    }
    
}
</script>

<style scoped>
</style>