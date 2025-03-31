<script setup lang="ts">
import { ref } from "vue";
import Mark from "@/components/game/Mark.vue";
import LineWinner from "@/components/game/LineWinner.vue";

interface Square {
  isActive: boolean;
  isCircle: boolean;
}

const turn = ref(1);
const lineWinnerPosition = ref("");
const board = ref<Square[]>(
  Array(9)
    .fill(null)
    .map(() => ({
      isActive: false,
      isCircle: false,
    }))
);

function checkWinner() {
  const winningCombinations = [
    {
      combination: [0, 1, 2],
      class: 'row-top',
    },
    {
      combination: [3, 4, 5],
      class: 'row-middle',
    },
    {
      combination: [6, 7, 8],
      class: 'row-bottom',
    },
    {
      combination: [0, 3, 6],
      class: 'column-left',
    },
    {
      combination: [1, 4, 7],
      class: 'column-middle',
    },
    {
      combination: [2, 5, 8],
      class: 'column-right',
    },
    {
      combination: [0, 4, 8],
      class: 'diagonal-right',
    },
    {
      combination: [2, 4, 6],
      class: 'diagonal-left',
    },
  ];

  for (const winningCombination of winningCombinations) {
    const [a, b, c] = winningCombination.combination;
    if (
      board.value[a].isActive &&
      board.value[b].isActive &&
      board.value[c].isActive &&
      board.value[a].isCircle === board.value[b].isCircle &&
      board.value[a].isCircle === board.value[c].isCircle
    ) {
      return winningCombination.class;
    }
  }
  return false;
}

const handleClick = async (index: number) => {
  if (board.value[index].isActive) {
    return;
  }

  board.value[index].isCircle = turn.value % 2 === 0;
  await sleep(1);
  board.value[index].isActive = true;

  turn.value++;

  const win = checkWinner();
  if (win) {
    await sleep(500);
    lineWinnerPosition.value = win;
    await sleep(600);
    alert(`Player ${board.value[index].isCircle ? "O" : "X"} wins!`);
  }
};

// UTILS
function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
</script>

<template>
  <main class="board">
    <LineWinner :position="lineWinnerPosition"/>
    <div
      v-for="(square, index) in board"
      :key="index"
      @click="handleClick(index)"
    >
      <Mark
        :id="`mark-${index}`"
        :isActive="square.isActive"
        :isCircle="square.isCircle"
      />
    </div>
  </main>
</template>

<style scoped>
.board {
  display: grid;
  place-items: center;
  place-content: center;
  grid-template-columns: 1fr 1fr 1fr;
  width: 23rem;
  height: 23rem;
  gap: 0.5em;
  position: relative;

  &::after {
    z-index: -1;
    animation: boardSpawn 0.6s 1s ease-in-out forwards;
    content: "";
    position: absolute;
    display: block;
    scale: 0;
    width: 100%;
    height: 100%;
    background-color: aqua;
  }

  & > div {
    background-color: var(--color-background);
    padding: 1rem;
    display: block;
    place-content: center;
    place-items: center;
    height: 8rem;
    aspect-ratio: 1;
  }
}

@keyframes boardSpawn {
  0% {
    scale: 0;
    border-radius: 50%;
  }
  100% {
    scale: 1;
    border-radius: 0;
  }
}
</style>
