import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import Home from './pages/Home.vue'
import PostView from './pages/PostView.vue'
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import AmplifyVue from '@aws-amplify/ui-vue';
import "@aws-amplify/ui-vue/styles.css";

// https://docs.amplify.aws/ui/auth/authenticator/q/framework/vue/#recommended-usage
Amplify.configure(awsconfig);

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
app.use(AmplifyVue)
app.mount('#app')
