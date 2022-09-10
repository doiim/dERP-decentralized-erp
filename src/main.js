import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Index from './components/Index.vue'
import Inventory from './components/Inventory.vue'
import Invoice from './components/Invoice.vue'
import Itens from './components/Itens.vue'
import Recipes from './components/Recipes.vue'
import './main.css'
import ConnectionPlugin from './plugins/connectionPlugin'

const pinia = createPinia()

const routes = [
  { path: '/', component: Index },
  { path: '/itens', component: Itens },
  { path: '/recipes', component: Recipes },
  { path: '/inventory', component: Inventory },
  { path: '/invoice', component: Invoice },
]
const router = createRouter({
  history: createWebHistory(),
  routes,
})

createApp(App).use(ConnectionPlugin).use(pinia).use(router).mount('#app')
