<template>
  <b-card class="p-3 m-3 card-style"
    title = "Register">

    <b-form @submit="sendRegisterRequest" class="form-style-register d-flex flex-column justify-content-between">
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
      
      <!-- Register button -->
      <div class="button-wrapper">
        <b-button
          type="submit"
          variant="primary"
          :disabled="
            !emailValid ||
            !usernameValid ||
            !passwordValid ||
            !confirmPasswordValid ||
            registering
          "
        >
          <b-spinner v-if="registering" small></b-spinner>
          <p v-else class="button-text">Register</p>
        </b-button>
      </div>
      
                <!-- Link to login -->
      <router-link :to="{ name: 'LoginRegisterControl', params: { mode: 'login' } }"
        >Already have an account? Login here!</router-link
      >
    </b-form>
  </b-card>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Register',
  computed: {
    ...mapState({
      registering: state => state.auth.registering
    }),
    emailValid: function () {
      if (this.email === null) {
        return null;
      }
      return this.emailRegExp.test(this.email);
    },
    usernameValid: function () {
      if (this.username === null) {
        return null;
      }
      return this.username.length >= 4;
    },
    passwordValid: function () {
      if (this.password === null) {
        return null;
      }
      return this.password.length >= 4;
    },
    confirmPasswordValid: function () {
      if (this.confirmPassword === null) {
        return null;
      }
      return (
        this.confirmPassword.length >= 4 &&
        this.confirmPassword === this.password
      );
    },
    emailMessage: function () {
      if (this.email === null) {
        return '';
      } else if (!this.emailRegExp.test(this.email)) {
        return 'Please enter a valid email';
      } else {
        return 'Please enter an email';
      }
    },
    usernameMessage: function () {
      if (this.username === null) {
        return '';
      } else if (this.username.length > 0) {
        return 'Username must be at least 4 characters';
      } else {
        return 'Please enter a username';
      }
    },
    passwordMessage: function () {
      if (this.password === null) {
        return '';
      } else if (this.password.length > 0) {
        return 'Password must be at least 4 characters';
      } else {
        return 'Please enter a password';
      }
    },
    confirmPasswordMessage: function () {
      if (this.confirmPassword === null) {
        return '';
      } else if (
        this.confirmPassword.length > 0 &&
        this.confirmPassword !== this.password
      ) {
        return 'Passwords must match';
      } else {
        return 'Please confirm the password';
      }
    }
  },
  data: function () {
    return {
      email: null,
      emailRegExp: /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
      username: null,
      password: null,
      confirmPassword: null,
      // windowWidth: null,  // For a possible dynamic rendoring method, may not need, will comment for now
    };
  },
  methods: {
    ...mapActions({
      register: 'auth/register',
    }),
    clearForm() {
      this.email = null;
      this.username = null;
      this.password = null;
      this.confirmPassword = null;
    },
    async sendRegisterRequest(event) {
      event.preventDefault();
      try {
        await this.register({
          email: this.email,
          username: this.username,
          password: this.password,
        });
        this.$router.push({ name: 'LoginRegisterControl', params: { mode: 'login' } });
      } finally {
        this.clearForm();
      }
    },
    // For a possible dynamic rendoring method, may not need, will comment for now
    // widthTracker() {
    //   this.windowWidth = window.innerWidth;
    // }
  },
  // For a possible dynamic rendoring method, may not need, will comment for now
  // mounted() {
  //   window.addEventListener('resize', this.widthTracker)
  // },
  // beforeDestroy() {
  //    window.removeEventListener('resize', widthTracker)
  // },
};
</script>

<style lang="scss" scoped>
  .form-style-register{
    height: 75%;
    width: 100%;
  }
 
</style>