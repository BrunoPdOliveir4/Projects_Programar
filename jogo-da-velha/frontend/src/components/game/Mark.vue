<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  isActive: {
    type: Boolean,
    default: true,
  },
  isCircle: {
    type: Boolean,
    default: false,
  },
});

const circleClass = computed(() => ({
  circle: true,
  remove: !props.isActive
}));

const crossClass = computed(() => ({
  cross: true,
  remove: !props.isActive
}));
</script>

<template>
  <div class="mark" v-if="isCircle">
    <svg viewBox="0 0 100 100" class="circle-container">
      <circle :class="circleClass"/>
    </svg>
  </div>

  <div class="mark" v-else>
    <svg viewBox="0 0 100 100" class="cross-container">
      <line :class="crossClass" x1="20" y1="20" x2="80" y2="80"/>
      <line :class="[crossClass, 'cross-delay']" x1="80" y1="20" x2="20" y2="80"/>
    </svg>
  </div>
</template>

<style scoped>
.mark {
  height: 5rem;
  aspect-ratio: 1;
  stroke: aqua;
  stroke-width: 15;

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
      stroke-dashoffset: 253;
      animation: drawCircle 0.5s forwards;

      &.remove {
        animation: drawCircle 0.5s forwards reverse;
      }
    }
  }

  .cross-container {

    .cross {
      fill: none;
      stroke-dasharray: 90;
      stroke-dashoffset: 90;
      animation: drawLine 0.3s forwards;

      &.cross-delay {
        animation-delay: 0.3s;
      }

      &.remove {
        animation: drawLine 0.3s forwards reverse;

        &.cross-delay {
          animation: removeLineDelayed 0.6s forwards;
        }
      }
    }
  }
}

@keyframes drawCircle {
  to {
    stroke-dashoffset: 0;
  }
}

@keyframes drawLine {
  to {
    stroke-dashoffset: 0;
  }
}

@keyframes removeLineDelayed {
  0%, 50% {
    stroke-dashoffset: 0;
  }
  100% {
    stroke-dashoffset: 90;
  }
}
</style>
