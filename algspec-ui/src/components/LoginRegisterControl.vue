<template>
    <b-container fluid>
    <b-row align-h = "center" align-v = "center">
      <b-col sm="0" md="6" class="left-side-style">
        <Blob2></Blob2>
        <Blob1></Blob1>

      </b-col>
      <b-col sm="12" md="6" class="register-column d-flex align-items-center justify-content-center">
        <Login v-if="mode == 'login'"></Login>
        <Register v-else></Register>
        <Blob3></Blob3>
        <Blob4></Blob4>
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
  a {
    &:hover {
      color: white;
    }
  }
</style>