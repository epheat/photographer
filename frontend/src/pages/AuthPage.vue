<template>
    <div class="ps-login-page page">
      <h1>{{ currentFlow.title }}</h1>
      <login-form
        v-if="currentFlow.route == 'login'"
        :errorMessage="errorMessage"
        @submit="onSubmit"
      />
      <reset-password-form
        v-if="currentFlow.route == 'reset'"
        :errorMessage="errorMessage"
        @submit="onReset"
      />
      <register-form
        v-if="currentFlow.route == 'register'"
        :errorMessage="errorMessage"
        @submit="onRegister"
      />
      <confirmation-form
        v-if="currentFlow.route == 'confirm'"
        :errorMessage="errorMessage"
        @submit="onConfirm"
      />
      <p v-if="currentFlow.route == 'forgor'">forgor</p>
      <p>© Evan Heaton 2021</p>
    </div>
</template>

<script>
import LoginForm from "../components/LoginForm.vue";
import { Auth } from "aws-amplify";
import { authStore } from "../auth/store.js";
import ResetPasswordForm from '../components/ResetPasswordForm.vue';
import RegisterForm from '../components/RegisterForm.vue';
import ConfirmationForm from '../components/ConfirmationForm.vue';

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
      errorMessage: undefined,
      stashedUsername: undefined,
    }
  },
  methods: {
    // Login flow
    async onSubmit(e) {
      this.errorMessage = undefined;
      try {
        let user = await Auth.signIn(e.username, e.password)
        if (user.challengeName == "NEW_PASSWORD_REQUIRED") {
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
      this.errorMessage = undefined;
      if (e.newPassword1 != e.newPassword2) {
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
      this.errorMessage = undefined;
      try {
        let signUpResult = await Auth.signUp({
          username: e.username,
          password: e.password,
          attributes: {
            email: e.email
          }
        })
        if (signUpResult.codeDeliveryDetails.DeliveryMedium == "EMAIL") {
          this.stashedUsername = e.username;
          this.$router.push({ path: 'confirm' });
        }
      } catch (err) {
        this.errorMessage = err.message;
      }
    },
    // Registration part2: confirmation flow
    async onConfirm(e) {
      this.errorMessage = undefined;
      if (!this.stashedUsername) {
        this.errorMessage = "How did you get here as an unknown user? Go away.";
        return;
      }
      try {
        let confirmationResult = await Auth.confirmSignUp(this.stashedUsername, e.code);
        if (confirmationResult == "SUCCESS") {
          this.$router.push({ path: 'login' });
        }
      } catch (err) {
        this.errorMessage = err.message;
      }
    },
    // Forgot password flow (I forgor)
    async onForgot(e) {
      console.log(e);
    }
  },
  computed: {
    currentFlow() {
      return authFlows.find(el => el.route == this.flowRoute)
    }
  },
  components: {
    'login-form': LoginForm,
    'reset-password-form': ResetPasswordForm,
    'register-form': RegisterForm,
    'confirmation-form': ConfirmationForm
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

  button {
    height: 30px;
    margin-bottom: 10px;
  }
}

.error-message {
  color: $ps-red;
}

</style>