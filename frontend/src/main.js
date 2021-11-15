import { createApp } from 'vue'
import { router } from './router/router.js';
import App from './App.vue'
import Amplify from 'aws-amplify';

// see: https://docs.amplify.aws/lib/auth/start/q/platform/js/#re-use-existing-authentication-resource
Amplify.configure({
    Auth: {
        region: process.env.VUE_APP_COGNITO_REGION,
        userPoolId: process.env.VUE_APP_COGNITO_USERPOOL_ID,
        userPoolWebClientId: process.env.VUE_APP_COGNITO_CLIENT_ID
    }
})

const app = createApp(App)
app.config.devtools = true;

app.use(router)
app.mount('#app')
