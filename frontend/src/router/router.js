import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import PostsPage from '../pages/PostsPage.vue'
import MusicPage from '../pages/MusicPage.vue'
import LoginPage from '../pages/LoginPage.vue'
import RegisterPage from '../pages/RegisterPage.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/posts', component: PostsPage },
  { path: '/music', component: MusicPage },
  { path: '/login', component: LoginPage },
  { path: '/register', component: RegisterPage },
]
// TODO: don't use hash history
export const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
});