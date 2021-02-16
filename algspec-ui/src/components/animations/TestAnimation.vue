<template>
  <v-stage :config="canvasConfig">
    <v-layer ref="layer1">
      <v-circle ref="circle1" :config="circle1Config"></v-circle>
      <v-circle ref="circle2" :config="circle2Config"></v-circle>
    </v-layer>
  </v-stage>
</template>

<script>
import Konva from 'konva';
import gsap from 'gsap';

export default {
  name: 'TestAnimation',
  data() {
    return {
      canvasConfig: {
        width: 500,
        height: 500
      },
      circle1Config: {
        x: 50,
        y: 50,
        radius: 30,
        fill: 'red',
        stroke: 'black',
        strokeWidth: 4
      },
      circle2Config: {
        x: 400,
        y: 100,
        radius: 50,
        fill: 'blue',
        stroke: 'black',
        strokeWidth: 4
      },
      layer1: null,
    };
  },
  mounted: function() {
    console.log(Konva, gsap);
    this.layer = this.$refs.layer1.getNode();
    this.master();
  },
  methods: {
    drawLayer() {
      this.layer.draw();
    },
    part1() {
      const circle1 = this.$refs.circle1.getNode();
      const tl = gsap.timeline()
        .to(circle1, {x: 150, y: 250, radius: 50, fill: 'blue', onUpdate: this.drawLayer, duration: 2});
      return tl;
    },
    part2() {
      const circle2 = this.$refs.circle2.getNode();
      const tl = gsap.timeline()
        .to(circle2, {y: 250, radius: 30, fill: 'red', onUpdate: this.drawLayer, duration: 2});
      return tl;
    },
    part3() {

    },
    master() {
      const master = gsap.timeline();
      master.add(this.part1());
      master.add(this.part2());
      master.yoyo(true)
        .repeat(-1);
    }
  }
};
</script>

<style>

</style>