import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import(/* webpackChunkName: "play" */ '../views/Home.vue')
    },
    {
        path: '/play',
        name: 'Play',
        component: () => import(/* webpackChunkName: "play" */ '../views/Play.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router