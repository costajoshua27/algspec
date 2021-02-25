<template>
    <b-container fluid id="login-register-control" class="p-0">
    <b-row align-h="center" align-v="center">
      <b-col sm="0" md="6" class="login-register-control-left">
        <Blob2></Blob2>
        <Blob1></Blob1>

      </b-col>
      <b-col sm="12" md="6" class="login-register-control-right">
        <b-row align-h="center" align-v="center" no-gutters>
          <Login v-if="mode == 'login'"></Login>
          <Register v-else></Register>
          <Blob3></Blob3>
          <Blob4></Blob4>
        </b-row>
      </b-col>
    </b-row>
    </b-container>
</template>

<script>
import Login from '@/components/Login';
import Register from '@/components/Register';
import Blob1 from '@/components/svg/Blob1';
import Blob2 from '@/components/svg/Blob2';
import Blob3 from '@/components/svg/Blob3';
import Blob4 from '@/components/svg/Blob4';

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
    Register,
    Blob1,
    Blob2,
    Blob3,
    Blob4
  },
}
</script>

<style lang="scss" scoped>
  #login-register-control {
    height: 100vh;
    // width: 100vw; This is causing the overflow in x direction
    overflow: hidden;
  }
  .row,
  .login-register-control-left,
  .login-register-control-right {
    height: 100%;
  }

  #blob1, #blob2 {
    position: absolute;
    left: 0;
    bottom: 0;
  }

  #blob3 {
    position: absolute;
    right: 0;
    bottom: 0;
  }

  #blob4 {
    position: absolute;
    right: 0;
    top: 0;
  }

  p {
    margin-bottom: 0;
  }
   /deep/ .card {
    /deep/ &-style {
      background: transparent;
      width: 80%;
      height: 80%;
      border: none;
    }

    /deep/ &-body {
      padding: 0;
    }

    /deep/ &-title {
      text-align: left;
      font-size: 2.5rem;
      margin-bottom: 25px;
    }
  }
  /deep/ .form {
    /deep/ &-style {
      height: 50%;
      width: 100%;
    }

  /deep/ &-row {
    display: block;
  }

  /deep/ &-control {
    background: $dm-primary;
    border: none;
    border-bottom: 2px solid $dm-text;
    outline: none;
    color: $dm-text;
    width: 115%;
  }
}
  /deep/ .col-form-label {
    display: block;
    text-align: left;
    font-size: 1.2rem;
    max-width: 100%;
  }

  /deep/ .register-column {
    height: 100vh;
    position: static;
  }

  /deep/ .btn {
    background: $dm-btn-primary;
    border-radius: 1.5rem;
    border: none;
    width: 50%;
  }

  /deep/ .button-wrapper {
    text-align: center;
  }

  /* left side */
  .left-side-style {
    position: static;
    height: 100vh;
  }

</style>