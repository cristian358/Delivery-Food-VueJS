import './assets//normalize.css'
import './assets/style.css'

import { makeServer } from "./server.js"

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import App from './App.vue'

import Home from './pages/Home.vue'
import PartnerPage from './pages/PartnerPage.vue'

const app = createApp(App)

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/partners/:name', name: 'PartnerPage', component: PartnerPage }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

app.use(router)
app.use(autoAnimatePlugin)

app.mount('#app')

if (process.env.NODE_ENV === "development") {
  makeServer()
}