<template>
  <b-container fluid>
    <b-row align-h = "center" align-v = "center">
      <b-col sm="0" md="6">HELLO</b-col>
      <b-col sm="12" md="6" class="register-column d-flex align-items-center justify-content-center">
        <b-card class="p-3 m-3 card-style"
         title = "algspec">
          <!-- <h3 class="ml-auto">algspec</h3> -->

          <!-- Alert(s) -->
          <b-alert
            :show="registerError.length > 0"
            variant="danger"
            dismissible
          >
            {{ registerError }}
          </b-alert>

          <b-form @submit="sendRegisterRequest" class="form-style d-flex flex-column justify-content-between no-gutters">
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
                class = "input-style"
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
                class = "input-style"
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
                class = "input-style"
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
                <p v-else>Register</p>
              </b-button>
            </div>
            
                      <!-- Link to login -->
            <router-link :to="{ name: 'Login' }"
              >Already have an account? Login here!</router-link
            >
          </b-form>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapActions } = createNamespacedHelpers('user');

export default {
  name: 'Register', //originally says 'Login'
  computed: {
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
    },
    ...mapState({
      registering: (state) => state.registering,
      registerError: (state) => state.registerError,
    }),
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
      register: 'register',
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
        const response = await this.register({
          email: this.email,
          username: this.username,
          password: this.password,
        });
        this.$router.push({
          name: 'Login',
          params: { initAlertMessage: response.data.message },
        });
      } catch (error) {
        console.log(error);
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

<style src='@/styles/register.css'>
</style>