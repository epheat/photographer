<template>
    <div class="ps-login-page page">
      <h1>{{ currentFlow.title }}</h1>
      <p class="success-message" v-if="successMessage">{{ successMessage }}</p>
      <login-form
        v-if="currentFlow.route === 'login'"
        :errorMessage="errorMessage"
        @submit="onSubmit"
      />
      <reset-password-form
        v-if="currentFlow.route === 'reset'"
        :errorMessage="errorMessage"
        @submit="onReset"
      />
      <register-form
        v-if="currentFlow.route === 'register'"
        :errorMessage="errorMessage"
        @submit="onRegister"
      />
      <confirmation-form
        v-if="currentFlow.route === 'confirm'"
        :initialUsername="stashedUsername"
        :errorMessage="errorMessage"
        @submit="onConfirm"
      />
      <forgot-password-form
        v-if="currentFlow.route === 'forgor'"
        :errorMessage="errorMessage"
        @submit="onForgot"
      />
      <forgot-confirmation-form
        v-if="currentFlow.route === 'forgor2'"
        :initialUsername="stashedUsername"
        :errorMessage="errorMessage"
        @submit="onForgotConfirm"
      />
      <Footer></Footer>
    </div>
</template>

<script>
import LoginForm from "../components/LoginForm.vue";
import { Auth } from "aws-amplify";
import { authStore } from "../auth/store.js";
import ResetPasswordForm from '../components/ResetPasswordForm.vue';
import RegisterForm from '../components/RegisterForm.vue';
import ConfirmationForm from '../components/ConfirmationForm.vue';
import Footer from '../components/Footer.vue';
import ForgotPasswordForm from '../components/ForgotPasswordForm.vue';
import ForgotConfirmationForm from '../components/ForgotConfirmationForm.vue';

const authFlows = [
  {
    route: 'login',
    title: 'Login 🔑',
  },
  {
    route: 'reset',
    title: 'Reset Password 🔄',
  },
  {
    route: 'register',
    title: 'Register 📖',
  },
  {
    route: 'confirm',
    title: 'Confirmation ✅'
  },
  {
    route: 'forgor',
    title: 'Forgot Password 🤕',
  },
  {
    route: 'forgor2',
    title: 'Confirmation ✅'
  }
]

export default {
  name: 'LoginPage',
  props: {
    flowRoute: String
  },
  beforeMount() {

  },
  data() {
    return {
      successMessage: undefined,
      errorMessage: undefined,
      stashedUsername: undefined,
    }
  },
  methods: {
    // Login flow
    async onSubmit(e) {
      this.resetMessages();
      try {
        let user = await Auth.signIn(e.username, e.password)
        if (user.challengeName === "NEW_PASSWORD_REQUIRED") {
          this.$router.push({ path: 'reset' });
        } else {
          authStore.setLoggedIn(user);
          this.$router.push('/');
        }
      } catch (err) {
        this.errorMessage = err.message;
      }
    },
    // Reset password flow
    async onReset(e) {
      this.resetMessages();
      if (e.newPassword1 !== e.newPassword2) {
        this.errorMessage = "New password fields must match.";
        return;
      }
      try {
        let currentUser = await Auth.currentUserPoolUser();
        let updatedUser = await Auth.changePassword(currentUser, e.currentPassword, e.newPassword1)
        console.log(updatedUser);
      } catch (err) {
        this.errorMessage = err.message;
      }
    },
    // Registration flow
    async onRegister(e) {
      this.resetMessages();
      try {
        let signUpResult = await Auth.signUp({
          username: e.username,
          password: e.password,
          attributes: {
            email: e.email
          }
        })
        if (signUpResult.codeDeliveryDetails.DeliveryMedium === "EMAIL") {
          this.stashedUsername = e.username;
          this.successMessage = `Sent a code to your email ${signUpResult.codeDeliveryDetails.Destination}`;
          this.$router.push({ path: 'confirm' });
        }
      } catch (err) {
        this.errorMessage = err.message;
      }
    },
    // Registration part2: confirmation flow
    async onConfirm(e) {
      this.resetMessages();
      try {
        let confirmationResult = await Auth.confirmSignUp(e.username, e.code);
        if (confirmationResult === "SUCCESS") {
          this.$router.push({ path: 'login' });
        }
      } catch (err) {
        this.errorMessage = err.message;
      }
    },
    // Forgot password flow (I forgor)
    async onForgot(e) {
      this.resetMessages();
      try {
        let forgotResult = await Auth.forgotPassword(e.username);
        if (forgotResult.CodeDeliveryDetails.DeliveryMedium === "EMAIL") {
          this.stashedUsername = e.username;
          this.successMessage = `Sent a code to your email ${forgotResult.CodeDeliveryDetails.Destination}`;
          this.$router.push({ path: 'forgor2' });
        }
      } catch (err) {
        this.errorMessage = err.message;
      }
    },
    // Forgot password part2: confirmation flow
    async onForgotConfirm(e) {
      this.resetMessages();
      if (e.newPassword1 !== e.newPassword2) {
        this.errorMessage = "New password fields must match.";
        return;
      }
      try {
        let confirmResult = await Auth.forgotPasswordSubmit(e.username, e.code, e.newPassword1);
        if (confirmResult === "SUCCESS") {
          this.successMessage = "Successfully reset password! 😇 Try logging in now...";
          this.$router.push({ path: 'login' });
        }
      } catch (err) {
        this.errorMessage = err.message;
      }
    },
    resetMessages() {
      this.successMessage = undefined;
      this.errorMessage = undefined;
    }
  },
  computed: {
    currentFlow() {
      return authFlows.find(el => el.route === this.flowRoute)
    }
  },
  components: {
    LoginForm,
    ResetPasswordForm,
    RegisterForm,
    ConfirmationForm,
    Footer,
    ForgotPasswordForm,
    ForgotConfirmationForm,
  }
}
</script>

<style lang="scss">
@import "../scss/colors.scss";

.ps-login-page {
  h1 {
    margin: 0;
    padding: 10px 0px;
    text-align: center;
  }
}

.form {
  display: flex;
  flex-direction: column;
  background-color: $ps-true-white;
  max-width: 400px;
  padding: 10px;
  margin: 0 auto;
  box-shadow: 0px 2px 4px rgba(20, 20, 20, 0.5);

  button {
    height: 30px;
    margin-bottom: 10px;
  }
}

.error-message {
  color: $ps-red;
}
.success-message {
  color: $ps-green;
  text-align: center;
}

</style>