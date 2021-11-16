import { createApp } from 'vue'
import { router } from './router/router.js';
import App from './App.vue'
import Amplify from 'aws-amplify';

console.log(`userPoolId: ${process.env.VUE_APP_COGNITO_USERPOOL_ID}`);
console.log(`clientId: ${process.env.VUE_APP_COGNITO_CLIENT_ID}`);

// see: https://docs.amplify.aws/lib/auth/start/q/platform/js/#re-use-existing-authentication-resource
Amplify.configure({
    Auth: {
        region: process.env.VUE_APP_COGNITO_REGION | "us-east-1",
        userPoolId: process.env.VUE_APP_COGNITO_USERPOOL_ID,
        userPoolWebClientId: process.env.VUE_APP_COGNITO_CLIENT_ID
    }
})

const app = createApp(App)
app.config.devtools = true;

app.use(router)
app.mount('#app')
