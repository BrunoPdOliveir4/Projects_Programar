<script setup lang="ts">

defineProps({
  isActive: {
    type: Boolean,
    default: false,
  },
  isCircle: {
    type: Boolean,
    default: false,
  },
});

</script>

<template>
  <div class="mark" v-if="isCircle">
    <svg viewBox="0 0 100 100" :class="['circle-container', {'remove': !isActive }]">
      <circle class="circle"/>
    </svg>
  </div>

  <div class="mark" v-else>
    <svg viewBox="0 0 100 100" :class="['cross-container', {'remove': !isActive }]">
      <line class="cross" x1="20" y1="20" x2="80" y2="80"/>
      <line class="cross cross-delay" x1="80" y1="20" x2="20" y2="80"/>
    </svg>
  </div>
</template>

<style scoped>
.mark {
  height: 5.5rem;
  aspect-ratio: 1;
  stroke: aqua;
  stroke-width: 15;

  .circle-container, .cross-container {
    stroke-dashoffset: 253;
  }

  .circle-container {
    transform: rotate(-90deg);

    .circle {
      /* SVG Properties */
      cx: 50;
      cy: 50;
      r: 40;
      fill: none;

      /* Animation */
      stroke-dasharray: 253;
      stroke-dashoffset: 0;
      transition: .6s;
    }

    &.remove .circle {
      stroke-dashoffset: 253;
    }
  }

  .cross-container {

    .cross {
      fill: none;
      stroke-dasharray: 90;
      stroke-dashoffset: 0;
      transition: .3s;

      &.cross-delay {
        transition-delay: 0.3s;
      }
    }
    
    &.remove .cross {
      stroke-dashoffset: 90;
    }
  }
}
</style>
