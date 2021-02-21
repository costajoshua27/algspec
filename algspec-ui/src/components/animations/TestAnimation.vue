<template>
  <v-stage :config="canvasConfig">
    <v-layer ref="layer1">
      <v-rect
        v-for="node of nodeConfigs"
        :key="node.key"
        :ref="node.key"
        :config="node.config"
      ></v-rect>
    </v-layer>
  </v-stage>
</template>

<script>
// import Konva from 'konva';
import gsap from 'gsap';

export default {
  name: 'TestAnimation',
  props: {
    width: {
      type: Number,
      default: 500
    },
    height: {
      type: Number,
      default: 500
    },
    nodeCount: {
      type: Number,
      default: 6
    },
    nodeWidth: {
      type: Number,
      default: 100
    },
    nodeHeight: {
      type: Number,
      default: 100
    }
  },
  data() {
    const nodes = [];
    const xGut = (this.width - (this.nodeCount * this.nodeWidth)) / this.nodeCount / 2;
    // const yGut = (this.height - (this.nodeCount * this.nodeHeight)) / this.nodeCount;

    for (let i = 0; i < this.nodeCount; ++i) {
        let x = i === 0 ? xGut : ((i + 1) * xGut) + ((i) * this.nodeWidth);
        let y = this.nodeHeight / 2;
        nodes.push({
          key: `node${i}`,
          config: {
            x,
            y,
            width: this.nodeWidth,
            height: this.nodeHeight,
            fill: 'green',
            stroke: 'black',
            strokeWidth: 1 
          }
        });
    }

    return {
      canvasConfig: {
        width: this.width,
        height: this.height
      },
      nodeConfigs: nodes,
      layer1: null,
      nodes: null,
    };
  },
  mounted: function() {
    this.layer = this.$refs.layer1.getNode();
    this.nodes = [];
    console.log(this.$refs);
    console.log(this.$refs['layer1']);
    for (let i = 0; i < this.nodeCount; ++i) {
      const nodeRefName = `node${i}`;
      const nodeRef = this.$refs[nodeRefName];
      console.log(nodeRef);
      this.nodes.push(nodeRef[0].getNode());
    }
    this.master();
  },
  methods: {
    drawLayer() {
      this.layer.draw();
    },
    appear() {
      const tl = gsap.timeline();
      for (let i = 0; i < this.nodeCount; ++i) {
        const currNode = this.nodes[i];
        tl.to(currNode, { 
          width: this.nodeWidth + 5,
          height: this.nodeHeight + 5,
          onUpdate: this.drawLayer,
          duration: 0.2
        });
        tl.to(currNode, {
          width: this.nodeWidth,
          height: this.nodeHeight,
          onUpdate: this.drawLayer,
          duration: 0.2
        });
      }
      return tl;
    },
    master() {
      const master = gsap.timeline();
      master.add(this.appear());
      master.repeat(-1);
    }
  }
};
</script>

<style lang="scss" scoped>

</style>