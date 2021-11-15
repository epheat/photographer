import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import Home from './pages/Home.vue'
import PostsPage from './pages/PostsPage.vue'
import MusicPage from './pages/MusicPage.vue'
import LoginPage from './pages/LoginPage.vue'
import RegisterPage from './pages/RegisterPage.vue'

const routes = [
    { path: '/', component: Home },
    { path: '/posts', component: PostsPage },
    { path: '/music', component: MusicPage },
    { path: '/login', component: LoginPage },
    { path: '/register', component: RegisterPage },
]
// TODO: don't use hash history
const router = createRouter({
    history: createWebHashHistory(),
    routes: routes,
})

const app = createApp(App)
app.config.devtools = true;

app.use(router)
app.mount('#app')
