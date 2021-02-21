<template>
    <b-container fluid>
    <b-row align-h = "center" align-v = "center">
      <b-col sm="0" md="6">HELLO</b-col>
      <b-col sm="12" md="6" class="register-column d-flex align-items-center justify-content-center">
        <Login v-if="mode == 'login'"></Login>
        <Register v-else></Register>
      </b-col>
    </b-row>
    </b-container>
</template>

<script>
import Login from '@/components/Login';
import Register from '@/components/Register';

export default {
  name: 'LoginRegisterControl',
  props: {
    mode: {
      type: String,
      required: true,
      validator: function (value) {
      // The value must match one of these strings
      return ['login', 'register'].indexOf(value) !== -1
      }
    }
  },
  components: {
    Login,
    Register
  },
}
</script>

<style src='@/styles/register.css'>

</style>