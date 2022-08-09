import { createWebHistory, createRouter } from 'vue-router'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: () => import('../views/WeatherWidget.vue'),
        }
    ]
})

export default router