import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import Home from './pages/Home.vue'
import PostView from './pages/PostView.vue'

const routes = [
    { path: '/', component: Home },
    { path: '/post/:postId', component: PostView },
]

// TODO: don't use hash history
const router = createRouter({
    history: createWebHashHistory(),
    routes: routes,
})

const app = createApp(App)

app.use(router)
app.mount('#app')
