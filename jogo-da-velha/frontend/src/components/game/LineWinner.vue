<script setup lang="ts">

defineProps({
  position: {
    type: String,
    required: false
  },
})

</script>

<template>
  <nav :class="['line', position]"></nav>
</template>

<style scoped>
.line {
  position: absolute;
  width: 0%;
  height: 5px;
  background-color: red;
  z-index: 1;
  transition: .6s;

  &:has([class*="*"]) {
    width: 100%;
  }

  &.row-top {
    width: 100%;
    width: 100%;
    top: 15%;
  }

  &.row-middle {
    width: 100%;
  }

  &.row-bottom {
    width: 100%;
    bottom: 15%;
  }

  &.column-left {
    width: 100%;
    left: -35%;
    rotate: 90deg;
  }

  &.column-middle {
    width: 100%;
    rotate: 90deg;
  }

  &.column-right {
    width: 100%;
    right: 35%;
    rotate: 90deg;
  }

  &.diagonal-left {
    width: 100%;
    width: 135%;
    rotate: -45deg;
  }

  &.diagonal-right {
    width: 100%;
    width: 135%;
    rotate: 45deg;
  }
}  
</style>