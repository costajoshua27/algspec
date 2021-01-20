<template>
  <v-stage :config="stageConfig">
    <v-layer>
      <v-circle :config="circleConfig"></v-circle>
    </v-layer>
  </v-stage>
</template>

<script>
export default {
  name: 'Visualization',
  props: {
    stageConfig: {
      type: Object,
      required: true
    },
    circleConfig: {
      type: Object,
      required: true
    }
  }
}
</script>

<style>

</style>