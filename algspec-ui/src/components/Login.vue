<template>
  <b-card class="p-3 m-3 card-style"
    title = "algspec">
    <h3>Login</h3>

    <b-form @submit="sendLoginRequest" class="form-style d-flex flex-column justify-content-between">
      <!-- E-mail -->
      <b-form-group
        id="email-group"
        label="E-Mail:"
        label-for="email-field"
        :invalid-feedback="emailMessage"
        :state="emailValid"
        label-size="sm"
        label-cols="12"
        label-cols-lg="2"
        content-cols="12"
        content-cols-lg="10"
      >
        <b-form-input
          type="email"
          id="email-field"
          class = "input-style"
          v-model="email"
          :state="emailValid"
          size="sm"
        ></b-form-input>
      </b-form-group>

      <!-- Password -->
      <b-form-group
        id="password-group"
        label="Password:"
        label-for="password-field"
        :invalid-feedback="passwordMessage"
        :state="passwordValid"
        label-size="sm"
        label-cols="12"
        label-cols-lg="2"
        content-cols="12"
        content-cols-lg="10"
      >
        <b-form-input
          id="password-field"
          class = "input-style"
          v-model="password"
          :state="passwordValid"
          type="password"
          size="sm"
        ></b-form-input>
      </b-form-group>

      <!-- Login button -->
      <div class="button-wrapper">
        <b-button
          type="submit"
          variant="primary"
          :disabled="!emailValid || !passwordValid || loggingIn"
        >
          <b-spinner v-if="loggingIn" small></b-spinner>
          <p v-else>Login</p>
        </b-button>
      </div>
    </b-form>

    <!-- Link to register -->
    <router-link :to="{ name: 'LoginRegisterControl', params: { mode: 'register' } }">Don't have an account? Register here!</router-link>

  </b-card>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const { mapActions } = createNamespacedHelpers('auth');

export default {
  name: 'Login',
  computed: {
    emailValid: function() {
      if (this.email === null) {
        return null;
      }
      return this.emailRegExp.test(this.email);
    },
    passwordValid: function() {
      if (this.password === null) {
        return null;
      }
      return this.password.length >= 4;
    },
    emailMessage: function() {
      if (this.email === null) {
        return '';
      } else if (!this.emailRegExp.test(this.email)) {
        return 'Please enter a valid email';
      } else {
        return 'Please enter an email';
      }
    },
    passwordMessage: function() {
      if (this.password === null) {
        return '';
      } else if (this.password.length > 0) {
        return 'Password must be at least 4 characters';
      } else {
        return 'Please enter a password';
      }
    }
  },
  data: function() {
    return {
      email: null,
      emailRegExp: /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
      password: null,
    };
  },
  methods: {
    ...mapActions({
      login: 'login'
    }),
    clearForm() {
      this.email = null;
      this.password = null;
    },
    async sendLoginRequest(event) {
      event.preventDefault();
      try {
        await this.login({
          email: this.email,
          password: this.password
        });
        this.$router.push({ name: 'Welcome' }); // Eventually needs to be dashboard
      } finally {
        this.clearForm();
      }
    }
  }
}
</script>

<style>

</style>