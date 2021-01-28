<template>
  <v-stage :config="stageConfig">
    <v-layer>
      <template v-for="entity in entities">
        <v-circle
          v-if="entity.entityType === 'circle'"
          :key="entity.x"
          :ref="entity.animation.ref"
          :config="entity.config"
        ></v-circle>
      </template>
    </v-layer>
  </v-stage>
</template>

<script>
import Konva from 'konva';

export default {
  name: 'Visualization',
  props: {
    stageConfig: {
      type: Object,
      required: true
    },
    entities: {
      type: Object,
      required: true
    }
  },
  mounted: function() {
    // Start running the visualization
    console.log(this.$refs);
    const refs = {};

    for (let entity of this.entities) {
      refs[entity.animation.ref] = this.$refs[entity.animation.ref][0].getNode();
      let visualizationFunction = new Function(entity.animation.arguments, entity.animation.body);
      const animation = new Konva.Animation(visualizationFunction, refs[entity.animation.ref].getLayer());
      animation.start();
    }
  }
}
</script>

<style>

</style>