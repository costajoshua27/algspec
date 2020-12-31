<template>
  <b-card class="p-3 m-3">
    <h3>Register</h3>

    <!-- Alert(s) -->
    <b-alert
      :show="alertShow"
      :variant="alertVariant"
      dismissible
    >
      {{ alertMessage }}
    </b-alert>

    <b-form @submit="sendRegisterRequest">
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
          v-model="email"
          :state="emailValid"
          size="sm"
        ></b-form-input>
      </b-form-group>

      <!-- Username -->
      <b-form-group
        id="username-group"
        label="Username:"
        label-for="username-field"
        :invalid-feedback="usernameMessage"
        :state="usernameValid"
        label-size="sm"
        label-cols="12"
        label-cols-lg="2"
        content-cols="12"
        content-cols-lg="10"
      >
        <b-form-input
          type="text"
          id="username-field"
          v-model="username"
          :state="usernameValid"
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
          v-model="password"
          :state="passwordValid"
          type="password"
          size="sm"
        ></b-form-input>
      </b-form-group>

      <!-- Password Confirmation -->
      <b-form-group
        id="confirm-password-group"
        label="Confirm Password:"
        label-for="confirm-password-field"
        :invalid-feedback="confirmPasswordMessage"
        :state="confirmPasswordValid"
        label-size="sm"
        label-cols="12"
        label-cols-lg="2"
        content-cols="12"
        content-cols-lg="10"
      >
        <b-form-input
          id="confirm-password-field"
          v-model="confirmPassword"
          :state="confirmPasswordValid"
          type="password"
          size="sm"
        ></b-form-input>
      </b-form-group>

      <!-- Submit button -->
      <b-button 
        type="submit"
        variant="primary"
        :disabled="!emailValid || !usernameValid || !passwordValid || !confirmPasswordValid"
      >
        Register
      </b-button>
    </b-form>

    <!-- Link to login -->
    <router-link :to="{ name: 'Login' }">Already have an account? Login here!</router-link>

  </b-card>
</template>

<script>
// import api from '@/config/api';

export default {
  name: 'Login',
  computed: {
    emailValid: function() {
      if (this.email === null) {
        return null;
      }
      return this.emailRegExp.test(this.email);
    },
    usernameValid: function() {
      if (this.username === null) {
        return null;
      }
      return this.username.length >= 4;
    },
    passwordValid: function() {
      if (this.password === null) {
        return null;
      }
      return this.password.length >= 4;
    },
    confirmPasswordValid: function() {
      if (this.confirmPassword === null) {
        return null;
      }
      return this.confirmPassword.length >= 4 && this.confirmPassword === this.password;
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
    usernameMessage: function() {
      if (this.username === null) {
        return '';
      } else if (this.username.length > 0) {
        return 'Username must be at least 4 characters';
      } else {
        return 'Please enter a username';
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
    },
    confirmPasswordMessage: function() {
      if (this.confirmPassword === null) {
        return '';
      } else if (this.confirmPassword.length > 0 && this.confirmPassword !== this.password) {
        return 'Passwords must match';
      } else {
        return 'Please confirm the password';
      }
    }
  },
  data: function() {
    return {
      email: null,
      emailRegExp: /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
      username: null,
      password: null,
      confirmPassword: null,

      alertShow: false,
      alertVariant: null,
      alertMessage: null,
    };
  },
  methods: {
    async sendRegisterRequest(event) {
      event.preventDefault();
      try {
        // await api.post('/user/login', { email, password }); 
        alert(JSON.stringify({ email: this.email, username: this.username, password: this.password, confirmPassword: this.confirmPassword }));
      } catch (error) {
        console.log('an error occured trying to login...', error);
      }
    }
  }
}
</script>

<style>

</style>