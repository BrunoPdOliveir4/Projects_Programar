<script setup lang="ts">
import Mark from '@/components/game/Mark.vue';

</script>

<template>
  <main class="board">
    <div><Mark/></div>
    <div><Mark/></div>
    <div><Mark/></div>
    <div><Mark/></div>
    <div><Mark/></div>
    <div><Mark/></div>
    <div><Mark/></div>
    <div><Mark/></div>
    <div><Mark/></div>
  </main>
</template>

<style scoped>
.board {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  width: 100%;
  height: 100%;
  place-content: center;
  place-items: center;
  overflow: hidden;

  & > div {
    border: 3px solid #ffffff;
    padding: 1rem;
    display: block;
    place-content: center;
    place-items: center;
  }
}
</style>