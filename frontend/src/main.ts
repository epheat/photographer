import { createApp } from 'vue'
import { router } from './router/router.js';
import App from './App.vue'
import { Amplify } from 'aws-amplify';

// see: https://docs.amplify.aws/lib/auth/start/q/platform/js/#re-use-existing-authentication-resource
Amplify.configure({
    Auth: {
        region: process.env.VUE_APP_COGNITO_REGION || "us-east-1",
        userPoolId: process.env.VUE_APP_COGNITO_USERPOOL_ID,
        userPoolWebClientId: process.env.VUE_APP_COGNITO_CLIENT_ID
    },
    API: {
        endpoints: [
            {
                name: "ps-api",
                endpoint: "https://ez567m8fv2.execute-api.us-east-1.amazonaws.com"
            },
        ]
    },
})

const app = createApp(App)

app.use(router)
app.mount('#app')
