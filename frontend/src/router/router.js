import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import PostsPage from '../pages/PostsPage.vue'
import MusicPage from '../pages/MusicPage.vue'
import AuthPage from '../pages/AuthPage.vue'
import EditorPage from '../pages/EditorPage.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/posts', component: PostsPage },
  { path: '/music', component: MusicPage },
  { path: '/auth/:flowRoute', component: AuthPage, props: true },
  { path: '/posts/new', component: EditorPage },
]
// TODO: don't use hash history
export const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
});