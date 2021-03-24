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

    //  height: 75vh;
    //  min-height: 500px;

    &-style {
      background: transparent;
      width: 80%;
      height: 80%;
      border: none;
    }

    &-body {
      padding: 0;
    }

    &-title {
      text-align: left;
      font-size: 3rem;
      margin-bottom: 25px;
    }
  }
  /deep/ .form {
    &-style {
      height: 45%;
      width: 100%;
    }

    &-row {
      display: block;
    }

    &-control {
      outline: none;
      width: 115%;
    }

    &-control-sm {
      font-size: 1.25rem;
    }
}
  /deep/ .col-form-label {
    display: block;
    text-align: left;
    font-size: 1.5rem;
    max-width: 100%;
  }

  /deep/ .register-column {
    height: 100vh;
    position: static;
  }

  /deep/ .btn {
    font-size: 1.5rem;
    border-radius: 1.5rem;
    border: none;
    width: 50%;
  }

  /deep/ .button  {
    &-wrapper {
      text-align: center;
    }

    &-text {
      margin-top: 0;
      margin-bottom: 0;
    }
  }
  
  /deep/ a {
    font-size: 1.5rem;
  }
  
  /* left side */
  .left-side-style {
    position: static;
    height: 100vh;
  }

</style>